import React, { useRef, useState } from 'react';
import API from '../utils/API';

const UpdateBlog = props => {

    const [post, setPost] = useState();

    const titleRef = useRef();
    const bodyRef = useRef();
    const tagsRef = useRef();

    console.log('props in UpdateBlog', props)

    const handleChange = () => {
        setPost({
            title: titleRef.current.value,
            body: bodyRef.current.value,
            tags: tagsRef.current.value
        })
    }

    const handleUpdate = e => {
        e.preventDefault();
        API.updateJournal(props.match.params.id, post);
        window.location.assign(`../../../${props.match.params.username}/blog`)
    }

    console.log('state in updateblog', post)
    return (
        <div>
            <div>
                <h1>update ya blog!</h1>
            </div>
            <div>
                <form onChange={handleChange}>
                    <div>
                        <input type="text" defaultValue={props.location.state.title} ref={titleRef} />
                    </div>
                    <div>
                        <textarea defaultValue={props.location.state.body} ref={bodyRef} />
                    </div>
                    <div>
                        <input type="text" defaultValue={props.location.state.tags} ref={tagsRef} />
                    </div>
                    <div>
                        <button onClick={handleUpdate}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateBlog;