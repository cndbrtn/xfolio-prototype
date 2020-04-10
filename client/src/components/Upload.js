import React, { useRef, useState } from 'react';
import { useUserContext } from '../utils/GlobalState'
import API from '../utils/API'

const Upload = props => {

    const [img, setImg] = useState({
        success: false,
        url: ''
    });

    const imgRef = useRef();
    const titleRef = useRef();
    const bodyRef = useRef();
    const tagsRef = useRef();

    const handleUpload = () => {
        
    }

    return (
        <div className="container upload">
            <div>
                <label htmlFor="upload">Choose an image</label>
                <input type="file" name="upload" ref={imgRef} />
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
        </div>
    )
}

export default Upload;