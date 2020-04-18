import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../utils/GlobalState';
import API from '../utils/API';
import Upload from './Upload'
import { GALLERY_PROPS } from '../utils/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Gallery = (props) => {
    const [state, dispatch] = useUserContext();
    const [worksState, setWorksState] = useState({ works: [] });
    // const [post, setPost] = useState({});
    const pathId = window.location.pathname.split('/')

    console.log('state', state)
    console.log('props', props)

    useEffect(() => {
        // console.log('props', props._id)
        API.getUser(pathId[1])
            .then(res => {
                console.log('gallery get res', res.data)
                setWorksState({
                    works: res.data.works
                });
                dispatch({
                    ...state,
                    type: GALLERY_PROPS,
                    username: res.data.username,
                    _id: res.data._id,
                    uploaded: false
                })
             })
    }, [state.uploaded])

    const handleDelete = (id) => {
        API.deleteArt(id)
        dispatch({
            ...state,
            uploaded: true
        })
    }
    
    const { works } = worksState;

    const handlePostDetail = (id) => {
        const postDetail = works.filter(post => {
            if (post._id === id) {
                return post;
            }
        })
        console.log('detail click', postDetail[0])
        const post = postDetail[0]
        dispatch({
            ...state,
            postId: post._id,
            postImg: post.img,
            postTitle: post.title,
            postDesc: post.description,
            postTags: post.tags
        })
    }
    

    if (!works || !works.length) {
        return (
            <div className="gallery-box">
            <div className="profile">
                <h1>Welcome to Xfolio: {props.username}</h1>
                <Upload />
                <Link to={'blog'}>Go to your blog page</Link>
            </div>
            <div className="gallery">
                <h3>No posts yet!</h3>
            </div>
            </div>

        )
    } else {
        return (

          <div className="gallery-box">
                <div className ="profile">
                    <p>Welcome to Xfolio: {props.username}</p>
                <Upload />
                <Link to={'blog'}>Go to your Jounral</Link>
                </div>
                <div className="gallery">
                {works.map(post => (
                    <div className="gall" key={post._id}>
                        <div className="gall-thumb">
                            <Link to={'gallery/work/' + post._id} onClick={() => handlePostDetail(post._id)}>
                                <img src={post.img} alt={post.title} />
                            </Link>
                        </div>
                        <div>
                            <button onClick={() => handleDelete(post._id)}>
                                <FontAwesomeIcon icon="trash" />
                            </button>
                            <button>
                                <FontAwesomeIcon icon="pencil-alt" />
                            </button>
                        </div>
                        <div className="gall-info">
                        <div>
                            <i>{post.title}</i>     
                        </div>
                        <div className="gall-descrip">
                            {post.description}
                        </div>
                        <div className="gall-tags">
                                {post.tags.map(tag => (
                                    <Link to={'#'} key={tag}>{tag} </Link>
                            ))}
                        </div>
                        </div>
                    </div>

                    ))}
                </div>
            </div>
        )
    }
}

export default Gallery;