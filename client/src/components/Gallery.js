import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../utils/GlobalState';
import API from '../utils/API';
import Upload from './Upload';
import Tags from './Tags';
import { GALLERY_PROPS } from '../utils/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Gallery = props => {
    const [state, dispatch] = useUserContext();
    const [worksState, setWorksState] = useState({ works: [] });
    // const [post, setPost] = useState({});
    const pathId = window.location.pathname.split('/')

    console.log('worksState', worksState)
    // console.log('props', props)

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

    // const handlePostDetail = (id) => {
    //     const postDetail = works.filter(post => {
    //         if (post._id === id) {
    //             return post;
    //         }
    //     })
    //     console.log('detail click', postDetail[0])
    //     const post = postDetail[0]
    //     dispatch({
    //         ...state,
    //         postId: post._id,
    //         postImg: post.img,
    //         postTitle: post.title,
    //         postDesc: post.description,
    //         postTags: post.tags
    //     })
    // }


    // console.log(window.location)
    

    if (!works || !works.length) {
        return (
            <div className="gallery-box">
            <div className="profile">
                <h1>Welcome to Xfolio: {props.username}</h1>
                <Upload />
                <Link to={'blog'}>Blog Page</Link>
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
                    <h1>Welcome to <span>X</span>folio: {props.username}</h1>
                <Upload />
                <Link to={'blog'}>Blog Page</Link>
                </div>
                <div className="gallery">
                {works.map(post => (
                    <div className="gall" key={post._id}>
                        <div className="gall-thumb">
                            <Link to={{
                                pathname: 'gallery/work/' + post._id,
                                state: {
                                    postId: post._id,
                                    postTitle: post.title,
                                    postImg: post.img,
                                    postDesc: post.description,
                                    postTags: post.tags
                                }
                            }}>
                                <img src={post.img} alt={post.title} />
                            </Link>
                        </div>
                       
                        <div className="gall-info">
                        <div className="gall-title">
                            {post.title}     
                        </div>
                        <div className="gall-descrip">
                            {post.description}
                        </div>
                            <div className="gall-tags">
                                {post.tags.map(tag => (
                                    <span key={tag}><Tags works={worksState.works} tags={tag} /> </span>
                                ))}
                        </div> 
                        <div>
                            <button className="del-butt" onClick={() => handleDelete(post._id)}>
                                <FontAwesomeIcon icon="trash" />
                            </button>
                            <button className="edit-butt">
                                <FontAwesomeIcon icon="pencil-alt" />
                            </button>
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