import React, { useRef } from 'react';
import { SECRET_KEY, SECRET_ID } from '../utils/keys'

function Upload() {

    const imgRef = useRef();
    const titleRef = useRef();
    const bodyRef = useRef();
    const tagsRef = useRef();

    const handleSubmit = () => {
        
    }

    return (
        <div>
            <label htmlFor="upload">Choose an image</label>
            <input type="file" name="upload" ref={imgRef} />
        </div>
    )
}

export default Upload;