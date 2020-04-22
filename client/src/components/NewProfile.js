import React, { useRef, useState, useEffect } from 'react';
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
    console.log('fileState in NewProfile', fileState)
    
    const imgRef = useRef();
    const twitRef = useRef();
    const bioRef = useRef();
    const nickRef = useRef();

    useEffect(() => {
        API.getUser(props.username)
            .then(user => {
                if (user.data.pfp) {
                    setBioState({
                        nickname: user.data.nickname,
                        bio: user.data.bio,
                        twitter: user.data.twitter
                    })
                    setFileState({
                        ...fileState,
                        fileUrl: user.data.pfp,
                    })
                } else {
                    setBioState({
                        nickname: user.data.nickname,
                        bio: user.data.bio,
                        twitter: user.data.twitter
                    })
                }
                
            })
    }, [props])

    // dynamic host for putting/getting images to/from bucket
    const host = window.location.host;
    const protocol = window.location.protocol;
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
        if (fileState.file) {
            const { file } = fileState;
            setFileState({ ...fileState, message: 'Uploading...' });
            // console.log('file.type', file.type);
            const contentType = file.type;
    
            const generatePutUrl = `${protocol}//${host}/generate-put-url`;
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
                    const { data } = res;    
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
                                    setFileState({ ...fileState, url })
    
                                    handlePost(url);
                                })
                        })
                        .catch(err => {
                            setFileState({ ...fileState, message: 'Something went wrong, try again' });
                            console.log('err', err);
                        });
                });
        } else {
            handlePost()
        }
    };
    
    console.log('bioState', bioState)

    const handlePost = (url) => {
        const { nickname, bio, twitter } = bioState;
        if (!url) {
            const newPf = {
                _id: props._id,
                nickname: nickname,
                bio: bio,
                twitter: twitter
            };
            API.updateUser(newPf);
            window.location.assign(`../../${props.username}/gallery`)
        } else {
            const newPf = {
                _id: props._id,
                pfp: url,
                nickname: nickname,
                bio: bio,
                twitter: twitter
            };    
            API.updateUser(newPf);
            window.location.assign(`../../${props.username}/gallery`)
        }
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
        <div className="nuprofile-page">
            <div className="container">
            <form className="nuprofile">
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
                    <input type="text" name="nickname" ref={nickRef} defaultValue={bioState.nickname} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="bio">Bio:</label><br />
                    <textarea name="bio" ref={bioRef} defaultValue={bioState.bio} onChange={handleChange} />
                </div>
                <div>
                        <label htmlFor="twit">Twitter handle:</label><br />
                    <input type="text" name="twit" ref={twitRef} defaultValue={bioState.twitter} onChange={handleChange} />
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