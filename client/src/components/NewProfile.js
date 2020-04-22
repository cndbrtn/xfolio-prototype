import React, { useRef, useState } from 'react';
import { useUserContext } from '../utils/GlobalState';
import API from '../utils/API';
import Granim from 'react-granim'
import axios from 'axios'

const NewProfile = props => {
    const granimColor = ({
        "default-state": {
            gradients: [
                ['#e5ff00', '#ff5100'],
                ['#00ffff', '#556270'],
                ['#ff0062', '#7ea0c4'],
                ['#6200ff', '#fd0000']
            ],
            transitionSpeed: 7000
        }
    });

    const granimImg = ({ source: '../images/bg.jpeg', blendingMode: 'multiply' });

    // const [state, dispatch] = useUserContext();

    // console.log('state in NewProfile', state)

    const [fileState, setFileState] = useState({
        message: '',
        file: '',
        fileUrl: '',
        url: ''
    });

    const [bioState, setBioState] = useState({
        nickname: '',
        bio: '',
        twitter: ''
    });

    const imgRef = useRef();
    const twitRef = useRef();
    const bioRef = useRef();
    const nickRef = useRef();

    // dynamic host for putting/getting images to/from bucket
    const host = window.location.host;
    const protocol = window.location.protocol;
    // console.log('host url', host)
    const getImage = e => {
        e.preventDefault();
        const files = imgRef.current.files;
        // console.log(files);
        if (files && files.length > 0) {
            const file = files[0];
            setFileState({
                ...fileState,
                file,
                fileUrl: URL.createObjectURL(e.target.files[0])
            });
        };
    };
    // console.log('img upload state:', fileState);
    const uploadFile = e => {
        e.preventDefault();
        const { file } = fileState;
        setFileState({ ...fileState, message: 'Uploading...' });
        // console.log('file.type', file.type);
        const contentType = file.type;

        const generatePutUrl = `${protocol}//${host}/generate-put-url`;
        // console.log('generatePutUrl', generatePutUrl)
        const options = {
            params: {
                Key: `${props.username}/pfp/${Date.now()}_${file.name}`,
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
                // console.log('put url from res.data', data);

                axios.put(data, file, options)
                    .then((res) => {
                        // console.log('put file', res.config.params);
                        setFileState({ ...fileState, message: 'Upload Successful' });

                        const params = res.config.params;
                        const generateGetUrl = `${protocol}//${host}/generate-put-url`
                        const options = { params };

                        axios.get(generateGetUrl, options)
                            .then(res => {
                                const { data } = res;
                                const url = data.replace(/\?.*/, '');
                                // console.log('replace ? and key in url', url);
                                setFileState({ ...fileState, url })

                                handlePost(url);
                            })
                    })
                    .catch(err => {
                        setFileState({ ...fileState, message: 'Something went wrong, try again' });
                        console.log('err', err);
                    });
            });
    };
    
    console.log('bioState', bioState)

    const handlePost = (url) => {
        const { nickname, bio, twitter } = bioState;
        // const { _id } = state;
        // console.log('_id in handlePost', _id)
        const newPf = {
            _id: props._id,
            pfp: url,
            nickname: nickname,
            bio: bio,
            twitter: twitter
        };

        console.log('newPF', newPf);

        API.updateUser(newPf);
        window.location.assign(`../../${props.username}/gallery`)
    }

    const handleChange = () => {
        const nickname = nickRef.current.value;
        const bio = bioRef.current.value;
        const twitter = twitRef.current.value;

        setBioState({
            ...bioState,
            nickname,
            bio,
            twitter
        })
    }

    return (
        <div className="signup-page">
            <div className="container signup login">
            <form>
                <div>
                    <label htmlFor="upload">Choose an image</label>
                    <input id="upload-file" type="file" name="upload" accept="image/*" onChange={getImage} ref={imgRef} />
                </div>
                {fileState.fileUrl ?
                    (<div className="upload-prev">
                        <img src={fileState.fileUrl} alt="preview" width="140px" />
                    </div>) :
                    (<h4>Preview...</h4>)
                }
                <div className="upload-mess">
                    {fileState.message}
                </div>
                <div>
                        <label htmlFor="nickname">Nickname: </label><br />
                    <input type="text" name="title" ref={nickRef} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="bio">Bio:</label><br />
                    <textarea name="body" ref={bioRef} onChange={handleChange} />
                </div>
                <div>
                        <label htmlFor="twit">Twitter:</label><br />
                    <input type="text" name="twit" ref={twitRef} onChange={handleChange} />
                </div>
                <div>
                    <button onClick={uploadFile}>Submit</button>
                </div>
                </form>
            </div>
            <Granim isPausedWhenNotInView="true" image={granimImg} states={granimColor} id="canvas-image" />
        </div>
    )
}

export default NewProfile;