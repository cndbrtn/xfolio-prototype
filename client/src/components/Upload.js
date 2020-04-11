import React, { useRef, useState } from 'react';
import { useUserContext } from '../utils/GlobalState'
import API from '../utils/API'

const Upload = props => {

    const [state, setState] = useState({
        message: '',
        file: ''
    });

    const imgRef = useRef();
    const titleRef = useRef();
    const bodyRef = useRef();
    const tagsRef = useRef();

    const getImage = e => {
        const files = imgRef.current.value;
        console.log(files);
        // if (files && files.length > 0) {
        const file = files[0];
        setState({ file });
        // }
        console.log('img upload state:', state)
    }

    const uploadFile = e => {
        e.preventDefault();
        // const { file } = 
    }

    return (
        <div className="container upload">
            <form>
                <div>
                    <label htmlFor="upload">Choose an image</label>
                    <input id="upload-fie" type="file" name="upload" accept="image/*" onChange={getImage} ref={imgRef} />
                </div>
                <div>
                    <input type="text" name="title" ref={titleRef} />
                </div>
                <div>
                    <textarea name="body" ref={bodyRef} />
                </div>
                <div>
                    <input type="text" name="tags" ref={tagsRef} />
                </div>
                <div>
                    <button type="submit" onSubmit={uploadFile}>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Upload;