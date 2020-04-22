import React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../utils/GlobalState';
import API from '../utils/API';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Posts = props => {
    const [state, setState] = useUserContext();
    // console.log('props in Post', props)
    // const url = window.location.toString().split('/');
    const handleDelete = id => {
        API.deleteJournal(id)
        setState({
            ...state,
            uploaded: true
        })
    }

    const { journal } = state;
    if (!journal.length) {
        return (
            <div>
                <h3>You don't have any posts yet</h3>
            </div>
        )
    } else {
        return (
            <div>
                {journal.map(post => (
                    <div key={post._id} className='postbox'>
                        <Link to={{
                            pathname: 'blog/' + post._id,
                            state: {
                                ...post
                            }
                        }}>
                        <h2>{post.title}</h2>
                        </Link>
                        <div>
                            {post.body}
                        </div>
                        <div className="tags">
                            {post.tags}
                        </div>
                        {props.loggedIn ? (
                        <div>
                            <button className="del-butt" onClick={() => handleDelete(post._id)}><FontAwesomeIcon icon="trash" /></button>
                            <button className="edit-butt">
                                <Link to={{
                                    pathname: `blog/update/${post._id}`,
                                    state: {
                                        ...post,
                                        user: props._id
                                    }
                                }}><FontAwesomeIcon icon="pencil-alt" /></Link>
                                </button>
                                </div>) :
                    (<span></span>)}
                        </div>
                ))}
            </div>
        )
    }
}

export default Posts;