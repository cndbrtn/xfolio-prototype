import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUserContext } from '../utils/GlobalState';
import API from '../utils/API';

const BlogButtons = ({ post, pathUser, loggedInUser, _id }) => {
    const [state, dispatch] = useUserContext();
    console.log('props in GallButtons', post)

    const handleDelete = (id) => {
        API.deleteArt(id)
        dispatch({
            ...state,
            uploaded: true
        })
    }

    if (pathUser === loggedInUser) {
        return (
            <div>
                <button className="del-butt" onClick={() => handleDelete(post._id)}><FontAwesomeIcon icon="trash" /></button>
                <button className="edit-butt">
                    <Link to={{
                        pathname: `blog/update/${post._id}`,
                        state: {
                            ...post,
                            user: _id
                        }
                    }}><FontAwesomeIcon icon="pencil-alt" /></Link>
                </button>
            </div>
        )
    } else {
        return (
            <span></span>
        )
    }
}

export default BlogButtons;