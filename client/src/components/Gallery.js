import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../utils/GlobalState';
import API from '../utils/API';
import Upload from './Upload';
import Tags from './Tags';
import { GALLERY_PROPS } from '../utils/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CorrectUserUpload = props => {
    const [state, dispatch] = useUserContext();
    const [worksState, setWorksState] = useState({ works: [] });
    // const [post, setPost] = useState({});
    const pathId = window.location.pathname.split('/')

    console.log('worksState', worksState)
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

    // const handleUpdate = (id) => {
    //     API.updateArt
    // }

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

    const handleLogOut = () => {
        API.logout();
    }
    if (!props.loggedIn && !works.length) {
        return (
            <div>
            <div className="gallery-box">
                <div className="profile">
                    <div>
                        <h2>{pathId[1]}'s gallery</h2>
                        <Link to={'blog'}>Blog Page</Link>
                    </div>
                    <div className="links">
                        <Link to={''}>Log in</Link>
                        <Link to={'/signup'}>Sign up</Link>
                    </div>
                </div>
            </div>
            <div className="gallery">
                <h3>No posts yet!</h3>
            </div>
            </div>
        )
    }

    if (props.loggedIn && props.username === pathId[1] && !works.length) {
        return (
            <div>
                <div className="gallery-box">
                    <div className="profile">
                        <div>
                            <h2>{pathId[1]}'s gallery</h2>
                            <Upload />
                            <Link to={'blog'}>Blog Page</Link>
                        </div>
                        <div className="links">
                            <Link to={''}>Log in</Link>
                            <Link to={'/signup'}>Sign up</Link>
                        </div>
                    </div>
                </div>
                <div className="gallery">
                    <h3>No posts yet! Upload a new image to start your gallery!</h3>
                </div>
            </div>
        )
    }

    if (!props.loggedIn && works.lenght > 0) {
        return (
            <div className="gallery-box">
                <div className="profile">
                    <h1>Welcome to Xfolio:</h1>
                        <div>
                            <h2>{pathId[1]}'s gallery</h2>
                        </div>
                    <Link to={'blog'}>Blog Page</Link>
                    <Link to={''}>Log in</Link>
                </div>
                <div className="gallery">
                    {works.map(post => (
                        <div className="gall" key={post._id}>
                            <div className="gall-thumb">
                                <Link to={{
                                    pathname: 'gallery/work/' + post._id,
                                    state: {
                                        postId: post._id,
                                        postImg: post.img,
                                        postDesc: post.description,
                                        postTags: post.tags
                                    }
                                }}>
                                    <img src={post.img} alt={post.title} />
                                </Link>
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
                                        <span key={tag}><Tags works={worksState.works} tags={tag} /> </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    if (props.loggedIn && props.username != pathId[1] && works.length > 0) {
        return (
            <div className="gallery-box">
                <div className="profile">
                    <h1>Welcome to Xfolio:</h1>
                    <div>
                        <h2>{pathId[1]}'s gallery</h2>
                    </div>
                    <Link to={'blog'}>Blog Page</Link>
                    <Link to={''} onClick={handleLogOut}>Log out</Link>
                </div>
                <div className="gallery">
                    {works.map(post => (
                        <div className="gall" key={post._id}>
                            <div className="gall-thumb">
                                <Link to={{
                                    pathname: 'gallery/work/' + post._id,
                                    state: {
                                        postId: post._id,
                                        postImg: post.img,
                                        postDesc: post.description,
                                        postTags: post.tags
                                    }
                                }}>
                                    <img src={post.img} alt={post.title} />
                                </Link>
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
                                        <span key={tag}><Tags works={worksState.works} tags={tag} /> </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    if (props.loggedIn && props.username === pathId[1] && works.lenght > 0) {
        return (

            <div className="gallery-box">
                <div className="profile">
                    <h1>Welcome to Xfolio: {props.username}</h1>
                        <Upload />
                        <div>
                            <h2>{pathId[1]}'s gallery</h2>
                        </div>
                    <Link to={'blog'}>Blog Page</Link>
                    <Link to={''} onClick={handleLogOut}>Log out</Link>

                </div>
                <div className="gallery">
                    {works.map(post => (
                        <div className="gall" key={post._id}>
                            <div className="gall-thumb">
                                <Link to={{
                                    pathname: 'gallery/work/' + post._id,
                                    state: {
                                        postId: post._id,
                                        postImg: post.img,
                                        postDesc: post.description,
                                        postTags: post.tags
                                    }
                                }}>
                                    <img src={post.img} alt={post.title} />
                                </Link>
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
                                        <span key={tag}><Tags works={worksState.works} tags={tag} /> </span>
                                    ))}
                                </div>
                                    <div>
                                        <button className="del-butt" onClick={() => handleDelete(post._id)}>
                                            <FontAwesomeIcon icon="trash" />
                                        </button>
                                        <button className="edit-butt" /* onClick={() => handleUpdate(post._id)} */>
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

const Gallery = props => {
    // const [state, dispatch] = useUserContext();
    // const [worksState, setWorksState] = useState({ works: [] });
    // const pathId = window.location.pathname.split('/')

    // console.log('worksState', worksState)
    // console.log('props', props)

    // useEffect(() => {
    //     // console.log('props', props._id)
    //     API.getUser(pathId[1])
    //         .then(res => {
    //             console.log('gallery get res', res.data)
    //             setWorksState({
    //                 works: res.data.works
    //             });
    //             dispatch({
    //                 ...state,
    //                 type: GALLERY_PROPS,
    //                 username: res.data.username,
    //                 _id: res.data._id,
    //                 uploaded: false
    //             })
    //         })
    // }, [state.uploaded])

    // const handleDelete = (id) => {
    //     API.deleteArt(id)
    //     dispatch({
    //         ...state,
    //         uploaded: true
    //     })
    // }

    // const { works } = worksState;

    // const handleLogOut = () => {
    //     API.logout();
    // }

    // if (!props.loggedIn && !works.length) {
    //     return (
    //         <div>
    //             <div className="gallery-box">
    //                 <div className="profile">
    //                     <div>
    //                         <h2>{pathId[1]}'s gallery</h2>
    //                         <Link to={'blog'}>Blog Page</Link>
    //                     </div>
    //                     <div className="links">
    //                         <Link to={''}>Log in</Link>
    //                         <Link to={'/signup'}>Sign up</Link>
    //                     </div>
    //                 </div>
    //             </div>
    //             <div className="gallery">
    //                 <h3>No posts yet!</h3>
    //             </div>
    //         </div>
    //     )
    // }

    // if (props.loggedIn && props.username === pathId[1] && !works.length) {
    //     return (
    //         <div>
    //             <div className="gallery-box">
    //                 <div className="profile">
    //                     <div>
    //                         <h2>{pathId[1]}'s gallery</h2>
    //                         <Upload />
    //                         <Link to={'blog'}>Blog Page</Link>
    //                     </div>
    //                     <div className="links">
    //                         <Link to={''}>Log in</Link>
    //                         <Link to={'/signup'}>Sign up</Link>
    //                     </div>
    //                 </div>
    //             </div>
    //             <div className="gallery">
    //                 <h3>No posts yet! Upload a new image to start your gallery!</h3>
    //             </div>
    //         </div>
    //     )
    // }

    // if (!props.loggedIn && works.lenght > 0) {
    //     return (
    //         <div className="gallery-box">
    //             <div className="profile">
    //                 <h1>Welcome to Xfolio:</h1>
    //                 <div>
    //                     <h2>{pathId[1]}'s gallery</h2>
    //                 </div>
    //                 <Link to={'blog'}>Blog Page</Link>
    //                 <Link to={''}>Log in</Link>
    //             </div>
    //             <div className="gallery">
    //                 {works.map(post => (
    //                     <div className="gall" key={post._id}>
    //                         <div className="gall-thumb">
    //                             <Link to={{
    //                                 pathname: 'gallery/work/' + post._id,
    //                                 state: {
    //                                     postId: post._id,
    //                                     postImg: post.img,
    //                                     postDesc: post.description,
    //                                     postTags: post.tags
    //                                 }
    //                             }}>
    //                                 <img src={post.img} alt={post.title} />
    //                             </Link>
    //                         </div>

    //                         <div className="gall-info">
    //                             <div>
    //                                 <i>{post.title}</i>
    //                             </div>
    //                             <div className="gall-descrip">
    //                                 {post.description}
    //                             </div>
    //                             <div className="gall-tags">
    //                                 {post.tags.map(tag => (
    //                                     <span key={tag}><Tags works={worksState.works} tags={tag} /> </span>
    //                                 ))}
    //                             </div>
    //                         </div>
    //                     </div>
    //                 ))}
    //             </div>
    //         </div>
    //     )
    // }

    // if (props.loggedIn && props.username != pathId[1] && works.length > 0) {
    //     return (
    //         <div className="gallery-box">
    //             <div className="profile">
    //                 <h1>Welcome to Xfolio:</h1>
    //                 <div>
    //                     <h2>{pathId[1]}'s gallery</h2>
    //                 </div>
    //                 <Link to={'blog'}>Blog Page</Link>
    //                 <Link to={''} onClick={handleLogOut}>Log out</Link>
    //             </div>
    //             <div className="gallery">
    //                 {works.map(post => (
    //                     <div className="gall" key={post._id}>
    //                         <div className="gall-thumb">
    //                             <Link to={{
    //                                 pathname: 'gallery/work/' + post._id,
    //                                 state: {
    //                                     postId: post._id,
    //                                     postImg: post.img,
    //                                     postDesc: post.description,
    //                                     postTags: post.tags
    //                                 }
    //                             }}>
    //                                 <img src={post.img} alt={post.title} />
    //                             </Link>
    //                         </div>

    //                         <div className="gall-info">
    //                             <div>
    //                                 <i>{post.title}</i>
    //                             </div>
    //                             <div className="gall-descrip">
    //                                 {post.description}
    //                             </div>
    //                             <div className="gall-tags">
    //                                 {post.tags.map(tag => (
    //                                     <span key={tag}><Tags works={worksState.works} tags={tag} /> </span>
    //                                 ))}
    //                             </div>
    //                         </div>
    //                     </div>
    //                 ))}
    //             </div>
    //         </div>
    //     )
    // }

    // if (props.loggedIn && props.username === pathId[1] && works.lenght > 0) {
    //     return (

    //         <div className="gallery-box">
    //             <div className="profile">
    //                 <h1>Welcome to Xfolio: {props.username}</h1>
    //                 <Upload />
    //                 <div>
    //                     <h2>{pathId[1]}'s gallery</h2>
    //                 </div>
    //                 <Link to={'blog'}>Blog Page</Link>
    //                 <Link to={''} onClick={handleLogOut}>Log out</Link>

    //             </div>
    //             <div className="gallery">
    //                 {works.map(post => (
    //                     <div className="gall" key={post._id}>
    //                         <div className="gall-thumb">
    //                             <Link to={{
    //                                 pathname: 'gallery/work/' + post._id,
    //                                 state: {
    //                                     postId: post._id,
    //                                     postImg: post.img,
    //                                     postDesc: post.description,
    //                                     postTags: post.tags
    //                                 }
    //                             }}>
    //                                 <img src={post.img} alt={post.title} />
    //                             </Link>
    //                         </div>

    //                         <div className="gall-info">
    //                             <div>
    //                                 <i>{post.title}</i>
    //                             </div>
    //                             <div className="gall-descrip">
    //                                 {post.description}
    //                             </div>
    //                             <div className="gall-tags">
    //                                 {post.tags.map(tag => (
    //                                     <span key={tag}><Tags works={worksState.works} tags={tag} /> </span>
    //                                 ))}
    //                             </div>
    //                             <div>
    //                                 <button className="del-butt" onClick={() => handleDelete(post._id)}>
    //                                     <FontAwesomeIcon icon="trash" />
    //                                 </button>
    //                                 <button className="edit-butt" /* onClick={() => handleUpdate(post._id)} */>
    //                                     <FontAwesomeIcon icon="pencil-alt" />
    //                                 </button>
    //                             </div>
    //                         </div>
    //                     </div>

    //                 ))}
    //             </div>
    //         </div>
    //     )
    // }
    const [state, dispatch] = useUserContext();
    const [worksState, setWorksState] = useState({ works: [] });
    // const [post, setPost] = useState({});
    const pathId = window.location.pathname.split('/')

    console.log('worksState', worksState)
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

    // const handleUpdate = (id) => {
    //     API.updateArt
    // }
    
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

    const handleLogOut = () => {
        API.logout();
    }

    if (!works || !works.length) {
        return (
            <div className="gallery-box">
            <div className="profile">
                    <h1>Welcome to Xfolio: {props.username}</h1>
                    {props.loggedIn ?
                        (<Upload />) :
                        (<div>
                            <h2>{pathId[1]}'s gallery</h2>
                        </div>)}
                
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
                    <h1>Welcome to Xfolio: {props.username}</h1>
                    {props.loggedIn ?
                        (<Upload />) :
                        (<div>
                            <h2>{pathId[1]}'s gallery</h2>
                        </div>)}
                    <Link to={'blog'}>Blog Page</Link>
                    {props.loggedIn ? (<Link to={''} onClick={handleLogOut}>Log out</Link>) :
                        (<Link to={''}>Log in</Link>)}
                
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
                        <div>
                            <i>{post.title}</i>     
                        </div>
                        <div className="gall-descrip">
                            {post.description}
                        </div>
                            <div className="gall-tags">
                                {post.tags.map(tag => (
                                    <span key={tag}><Tags works={worksState.works} tags={tag} /> </span>
                                ))}
                        </div> 
                            {props.loggedIn ? (
                                <div>
                                <button className="del-butt" onClick={() => handleDelete(post._id)}>
                                    <FontAwesomeIcon icon="trash" />
                                </button>
                                <button className="edit-butt" /* onClick={() => handleUpdate(post._id)} */>
                                    <FontAwesomeIcon icon="pencil-alt" />
                                </button>
                                </div>) :
                                (<span></span>)}
                        
                        </div>
                    </div>

                    ))}
                </div>
            </div>
        )
    }
}

export default Gallery;