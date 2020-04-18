import React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../utils/GlobalState';
import API from '../utils/API';

const Posts = () => {
    const [state] = useUserContext();

    // const url = window.location.toString().split('/');

    const { journal } = state;
    if (!journal.length) {
        return (
            <div>
                <h3>You don't have any posts yet</h3>
                <Link to='gallery'>Gallery Page</Link>
            </div>
        )
    } else {
        return (
            <div>
                {journal.map(post => (
                    <div key={post._id}>
                        <Link to={'blog/' + post._id}>
                        <h2>{post.title}</h2>
                        </Link>
                        <div>
                            {post.body}
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

export default Posts;