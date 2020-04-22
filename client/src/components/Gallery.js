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
    const [worksState, setWorksState] = useState({
        works: [],
        pfp: '',
        nickname: '',
        bio: '',
        twitter: '',
        _id: ''
    });
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
                    works: res.data.works,
                    pfp: res.data.pfp,
                    nickname: res.data.nickname,
                    twitter: res.data.twitter,
                    bio: res.data.bio,
                    _id: res.data._id
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
    
    const { works, nickname, pfp, twitter, bio } = worksState;
    console.log('works in gallery', works)

    const handleLogOut = () => {
        API.logout();
        window.location.assign('../../');
    }

    const folioTag = 'portfolio';

    if (!works || !works.length) {
        return (
            <div className="gallery-box">
            <div className="profile">
                    <h1>Welcome to <span>X</span>folio: {props.username}</h1>
                    <img src={pfp} alt="profile picture" height="150px" width="150px" />
                    {twitter ? 
                        (<a href={twitter} target="_blank"><FontAwesomeIcon icon={['fab', 'twitter']} /> profile</a>):
                        (<span></span>)
                    }
                    
                    <div>
                        <p>Bio: {bio}</p>
                    </div>
            {props.loggedIn ?
                (<div>
                    <Link to={`../../${props.username}/setup`}>Update Profile</Link>
                    <Upload loggedInId={props._id} loggedInUser={props.username} pathUser={pathId[1]} />
                </div>) :
                (<div>
                    <h2>{pathId[1]}'s gallery</h2>
                </div>)
            }
            <Link to={'blog'}>Go To Blog</Link>
                {props.loggedIn ?
                    (<div>
                        <p><Link to='#' onClick={handleLogOut}>Log out</Link></p>
                    </div>):
                    (<div>
                        <p><Link to='/login'>Sign in</Link></p>
                        <p><Link to='/signup'>Sign up</Link></p>
                    </div>)
                    }
                    <div>
                        <Link to={''}>Home</Link>
                    </div>
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
                    <img src={pfp} alt="profile picture" height="150px" width="150px" />
                    <p>Bio: {bio}</p>
                    <a href={twitter} target="_blank"><FontAwesomeIcon icon={['fab', 'twitter']} /> twitter link</a>
                    <br></br>
                    {props.loggedIn ?
                        (<div>
                            <Link className="incognito-link" to={`../../${props.username}/setup`}>(Update Profile)</Link>
                            <hr></hr>
                            <Upload loggedInId={props._id} loggedInUser={props.username} pathUser={pathId[1]} />
                        </div>) :
                        (<div>
                            <h2>Now viewing {pathId[1]}'s gallery</h2>
                        </div>)}
                    <Link to={'blog'}>Blog Page</Link>
                    <div>
                    <Link to={{
                        pathname: `gallery/${folioTag}`,
                        state: { works: works }
                    }}>Portfolio</Link>
                    </div>
                    <div>
                        <Link to={''}>Home</Link>
                    </div>
                    {props.loggedIn ?
                        (<p><Link to="#" onClick={handleLogOut}>Log out</Link></p>) :
                        (<div><p><Link to='/login'>Sign in</Link></p>
                        <p><Link to='/signup'>Sign up</Link></p></div>)
                    }
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
                        {/* <div className="gall-descrip">
                            {post.description}
                        </div> */}
                            <div className="gall-tags">
                                {post.tags.map(tag => (
                                    <span key={tag}><Tags works={works} tags={tag} /> </span>
                                ))}
                        </div> 
                            {props.loggedIn ? (
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
                                    {/* <i className="edit-butt"> */}
                                        <FontAwesomeIcon icon="pencil-alt" />
                                    {/* </i> */}
                                </Link>
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