import React, { useRef, useState } from 'react';
import API from '../utils/API';

const UpdateArt = ({location, match}) => {
    console.log('props.location in UpdateArt', location)
    console.log('props.match in UpdateArt', match)
    const [update, setUpdate] = useState();
    const { state } = location;
    const { params } = match;

    const titleRef = useRef();
    const bodyRef = useRef();
    const tagsRef = useRef();

    const handleChange = () => {
        // console.log('formRef', bodyRef.current.value)
        setUpdate({
            title: titleRef.current.value,
            description: bodyRef.current.value,
            tags: tagsRef.current.value.split(',')
        })
    }

    console.log('update state', update)
    const handleUpdate = (e) => {
        e.preventDefault();
        API.updateArt(params.id, update)
            
        window.location.assign('/' + params.username + '/gallery')
        
    }

    return (
        <div>
            <form onChange={handleChange}>
                <div>
                <img src={state.img} alt={state.title} />
                </div>
                <div>
                    <input type="text" defaultValue={state.title} ref={titleRef} />
                </div>
                <div>
                    <textarea defaultValue={state.description} ref={bodyRef} />
                </div>
                <div>
                    <input type="text" defaultValue={state.tags} ref={tagsRef} />
                </div>
                <div>
                    <button onClick={handleUpdate}>Save</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateArt;