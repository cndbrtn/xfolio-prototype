import React, { useRef, useState } from 'react';
import API from '../utils/API';
import { Link } from 'react-router-dom';

const UpdateArt = ({location, match}) => {
    // console.log('props.location in UpdateArt', location)
    // console.log('props.match in UpdateArt', match)
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

    // console.log('update state', update)
    const handleUpdate = (e) => {
        e.preventDefault();
        API.updateArt(params.id, update)
            
        window.location.assign('/' + params.username + '/gallery')  
    }

    return (
        <div>
            <form onChange={handleChange}>
                <div  className="detail-box">
            <div className="full-info">
                <div>
                <label htmlFor="title">Title:</label>
                    <input type="text" name="title" defaultValue={state.title} ref={titleRef} />
                </div>
                <div>
                <label htmlFor="body">Description:</label>
                    <textarea name="body" defaultValue={state.description} ref={bodyRef} />
                </div>
                <div>
                <label htmlFor="tags">Tags, separated by a comma:</label>
                    <input name="tags" type="text" defaultValue={state.tags} ref={tagsRef} />
                </div>
                <div>
                    <button onClick={handleUpdate}>Save</button>
                </div>
                <div className="go-back">
                            <Link to={'/' + params.username + '/gallery'}>Go back</Link>
                    </div>
                </div>
                <div className="full-image">
                <img className="full-image" src={state.img} alt={state.title} />
                </div>
                </div>
            </form>
        </div>
    )
}

export default UpdateArt;