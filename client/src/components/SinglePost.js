import React from 'react';
import { Link } from 'react-router-dom'

const SinglePost = props => {
    const post = props.location.state

    // console.log('post props in SinglePost', post)

    return (
        <div className="single-post">
            <Link to={{pathname: '../blog'}}>Back to blog</Link>
            {post ? (
                <div>
                    <div className="post-title">
                        <h1>{post.title}</h1>
                    </div>
                    <div className="post-body">
                        <p>{post.body}</p>
                    </div>
                    <div className="post-tags">Tagged: {post.tags.map(tag => (
                        <span key={tag}>{tag} </span>
                    ))}
                    </div>
                    <div>
                        <Link onClick={() => window.history.back()}>Go back</Link>
                    </div>
                </div>) : (<h3>Loading...</h3>)}
           
        </div>
    )
}

export default SinglePost;