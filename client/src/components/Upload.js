import React, { useRef } from 'react';

function Upload() {

    const imgRef = useRef();
    const titleRef = useRef();
    const bodyRef = useRef();
    const tagsRef = useRef();

    return (
        <div>
            <label for="upload">Choose an image</label>
            <input type="file" name="upload" ref={imgRef} />
        </div>
    )
}

export default Upload;