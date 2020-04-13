import React from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { useUserContext } from '../utils/GlobalState';

const Gallery = () => {
    const [state, dispatch] = useUserContext();
    const history = useHistory();
    // const uploadLink = history.push(`/upload`)

    const { works } = state;

    if (!works.length) {
        return (
            <div>
                <h3>No posts yet!</h3>
                {/* <Link to={uploadLink}>Upload an image</Link> */}
            </div>
        )
    } else {
        return (
            <div>
                {works.map(post => (
                    <div>
                        <div>
                            <img src={post.img} alt={post.title} />
                        </div>
                        <div>
                            {post.title}
                        </div>
                        <div>
                            {post.description}
                        </div>
                        <div>
                            {post.tags}
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default Gallery;