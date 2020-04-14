import React, { useRef } from 'react';
import { useUserContext } from '../utils/GlobalState';

const NewPost = () => {
    const [state, dispatch] = useUserContext();

    const titleRef = useRef();
    const bodyRef = useRef();
    const tagsRef = useRef();

    return (
        <div>
            <form>
                <div>
                    <input type="text" name="title" placeholder="Post Title" ref={titleRef} />
                </div>
                <div>
                    <textarea name="body" placeholder="What's up buttercup?" ref={bodyRef} />
                </div>
                <div>
                    <input type="text" name="tags" placeholder="separate tags with commas, like, this" />
                </div>
                <div>
                    <button name="submit" onClick={''}>Submit Post</button>
                </div>
            </form>
        </div>
    )
}

export default NewPost;