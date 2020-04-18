import React, { useEffect, useState } from 'react';
import API from '../utils/API';

const SinglePost = props => {

    const [post, setPost] = useState();

    console.log(props.match)

    useEffect(() => {
        API.getJournal(props.match.params.username)
            .then(user => {
                console.log('user res', user.data.journal)
                const journal = user.data.journal.filter(post => {
                    if (post._id === props.match.params.id)
                        return post
                })
                console.log('filtered journal', journal[0])
                setPost({
                    _id: journal[0]._id,
                    title: journal[0].title,
                    body: journal[0].body,
                    tags: journal[0].tags
                })
        })
    }, [])

    console.log('poststate', post)


    return (
        <div className="single-post">
            {post ? (
                <div>
                    <div className="post-title">
                        <h1>{post.title}</h1>
                    </div>
                    <div className="post-body">
                        <p>{post.body}</p>
                    </div>
                    <div>{post.tags.map(tag => (
                        <span key={tag}>{tag} </span>
                    ))}
                    </div>
                </div>) : (<h3>Loading...</h3>)}
           
        </div>
    )
}

export default SinglePost;