import React, { useRef, useState } from 'react';
import { useUserContext } from '../utils/GlobalState';
import API from '../utils/API';
import { GALLERY_PROPS } from '../utils/actions';

const NewPost = props => {
    console.log('props in NewPost', props)
    const [state, dispatch] = useUserContext();
    const [postState, setPostState] = useState();

    const titleRef = useRef();
    const bodyRef = useRef();
    const tagsRef = useRef();

    const handleChange = e => {
        e.preventDefault();
        
        const title = titleRef.current.value;
        const body = bodyRef.current.value;
        const tags = tagsRef.current.value.split(',');
        const tag = tags.map(tag => {
            const trimTag = tag.trim();
            const regex = /\s+/g;
            const underscoreTag = trimTag.replace(regex, '_')
            return underscoreTag;
        })
        
        console.log({ title: title, body: body, tags: [tag] })
        setPostState({
            title,
            body,
            tags: tag
        })
    };

    const handleSubmit = e => {
        e.preventDefault();

        const { title, body, tags } = postState;
        const { _id } = state;
        const newPost = {
            userId: _id,
            title,
            body,
            tags
        };

        API.postJournal(newPost)
            dispatch({
                ...state,
                type: GALLERY_PROPS,
                uploaded: true,
                    // journal: post.data.journal
            })
    }

    // console.log('postState', postState);

    if (props.loggedInUser === props.pathUser) {
        return (
            <div className="blog-upload">
                <h2>Make a post:</h2>
                <form onChange={handleChange}>
                    <div>
                    <label htmlFor="title">Title:</label><br />
                        <input type="text" name="title" ref={titleRef} />
                    </div>
                    <div>
                    <label htmlFor="body">Post:</label><br />
                        <textarea name="body" ref={bodyRef} />
                    </div>
                    <div>
                    <label htmlFor="tags">Tags, separated by a comma:</label><br />
                        <input type="text" name="tags" ref={tagsRef} />
                    </div>
                    <div>
                        <button name="submit" onClick={handleSubmit}>Submit Post</button>
                    </div>
                </form>
            </div>
        )
    } else {
        return (<span></span>)
    }
}

export default NewPost;