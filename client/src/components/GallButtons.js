import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUserContext } from '../utils/GlobalState';
import API from '../utils/API';

const GallButtons = ({ post, pathUser, loggedInUser }) => {
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
                <button className="del-butt" onClick={() => handleDelete(post._id)}>
                    <FontAwesomeIcon icon="trash" />
                </button>
                <button className="edit-butt">
                    <Link to={{
                        pathname: 'gallery/update/' + post._id,
                        state: {
                            ...post
                        }
                    }}>
                        <FontAwesomeIcon icon="pencil-alt" />
                    </Link>
                </button>
             </div>
        )
    } else {
        return (
            <span></span>
        )
    }
}

export default GallButtons;