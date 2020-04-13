import React, { useRef, useState } from 'react';
import { useUserContext } from '../utils/GlobalState'
// import API from '../utils/API'
import axios from 'axios';

const Upload = () => {

    const [state] = useUserContext();

    const [fileState, setFileState] = useState({
        message: '',
        file: '',
        url: ''
    });

    const [artState, setArtState] = useState({
        title: '',
        postBody: '',
        tags: []
    });
    
    console.log('artState', artState)

    const imgRef = useRef();
    const titleRef = useRef();
    const bodyRef = useRef();
    const tagsRef = useRef();
    const uploadedImg = useRef();

    // dynamic host for putting/getting images to/from bucket
    const host = window.location.host;

    const getImage = e => {
        e.preventDefault();
        const files = imgRef.current.files;
        // console.log(files);
        if (files && files.length > 0) {
            const file = files[0];
            setFileState({ ...fileState, file });
            const reader = new FileReader();
            const { current } = uploadedImg;
            current.file = file;
            reader.onload = e => {
                // console.log(e.target.result)
                current.src = e.target.result;
            };
            reader.readAsDataURL(file);
        };
    };

    // console.log('img upload state:', fileState);

    const uploadFile = e => {
        e.preventDefault();
        const { file } = fileState;
        setFileState({ ...fileState, message: 'Uploading...' });
        // console.log('file.type', file.type);
        const contentType = file.type;

        const generatePutUrl = `http://${host}/generate-put-url`;
        // console.log('generatePutUrl', generatePutUrl)
        const options = {
            params: {
                Key: `${Date.now()}_${file.name}`,
                ContentType: contentType
            },
            headers: {
                'Content-Type': contentType
            }
        };

        axios.get(generatePutUrl, options)
            .then(res => {
                // console.log('res.data', res.data)
                const { data } = res;
                console.log('put url from res.data', data);

                axios.put(data, file, options)
                    .then((res) => {
                        // console.log('put file', res.config.params);
                        setFileState({ ...fileState, message: 'Upload Successful' });
                        // setTimeout(() => {
                        //     setFileState({ ...fileState, message: '' })
                        //     imgRef.current.value = '';
                        // }, 2000)

                        const params = res.config.params;
                        const generateGetUrl = `http://${host}/generate-put-url`
                        const options = {params};

                        axios.get(generateGetUrl, options)
                            .then(res => {
                                const { data } = res;
                                const url = data.replace(/\?.*/, '');
                                // console.log(trimData);
                                setFileState({ ...fileState, url })

                                handlePost(url);
                                // console.log('fileState in generateGetUrl axios call', fileState)
                                // const { url } = fileState;
                                // const reader = new FileReader();
                                // const { current } = uploadedImg;
                                // current.file = url;
                                // reader.onload = e => {
                                //     current.src = e.target.result;
                                // };

                                // reader.readAsDataURL(url);
                            })
                    })
                    .catch(err => {
                        setFileState({ ...fileState, message: 'Something went wrong, try again' });
                        console.log('err', err);
                    });
            });
    };

    const handlePost = (url) => {
        const { title, postBody, tags } = artState;
        const { _id } = state;
        // const { url } = fileState;
        const newArt = {
            userId: '5e93f5529466e5a248486282',
            url,
            title,
            postBody,
            tags
        }
        axios.post('/api/artwork', newArt)
            .then(res => console.log('post new art res', res))
    }

    // console.log('filestate', fileState);

    const handleChange = e => {
        e.preventDefault();
        const title = titleRef.current.value;
        const postBody = bodyRef.current.value;
        const tags = tagsRef.current.value.split(',');
        // const splitTag = tag;
        // const allTags = splitTag;
        const prettyTags = tags.map(tag => {
            const trimTag = tag.trim();
            const regex = /\s+/g;
            const underscoreTag = trimTag.replace(regex, '_')
            return underscoreTag;
        });

        console.log('prettyTags', prettyTags);

        setArtState({
            ...artState,
            title,
            postBody,
            tags: prettyTags
        })
    }
    
    return (
        <div className="container upload">
            <form>
                <div>
                    <label htmlFor="upload">Choose an image</label>
                    <input id="upload-fie" type="file" name="upload" accept="image/*" onChange={getImage} ref={imgRef} />
                </div>
                <div>
                    {fileState.message}
                </div>
                    <div>
                        <img ref={uploadedImg} alt="preview" />
                    </div>
                <div>
                    <input type="text" name="title" ref={titleRef} onChange={handleChange} />
                </div>
                <div>
                    <textarea name="body" ref={bodyRef} onChange={handleChange} />
                </div>
                <div>
                    <input type="text" name="tags" ref={tagsRef} onChange={handleChange} />
                </div>
                <div>
                    <button onClick={uploadFile}>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Upload;