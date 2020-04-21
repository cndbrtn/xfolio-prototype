import React, { useEffect } from 'react';
import { useUserContext } from '../utils/GlobalState';
import { Link } from 'react-router-dom';
import Posts from './Post';
import NewPost from './NewPost';
import { GALLERY_PROPS } from '../utils/actions';
import API from '../utils/API'

const Blog = (props) => {
    const [state, dispatch] = useUserContext();
    console.log('props in blog', props)
    // console.log('window history', window.history)
    
    const url = window.location.toString().split('/');
    console.log('url', url[3])
    
    useEffect(() => {
        API.getJournal(url[3])
           .then(res => {
                console.log('no props res', res.data)
                dispatch({
                    ...state,
                    _id: res.data._id,
                    type: GALLERY_PROPS,
                    journal: res.data.journal,
                    uploaded: false
                })
           })
           .catch(err => console.log('err', err))
        }, [state.uploaded]);
    
    console.log('state', state);
    
    const handleLogOut = () => {
        API.logout();
        window.location.assign('../../');
    }
        
        return (
            <div className="blog">
                <div className="profile">
                    {props.loggedIn ?
                        (<div>
                            <h1>Hello {props.username}</h1>
                        </div>) :
                        (<div>
                            <h2>Now viewing {url[3]}'s blog</h2>
                            
                        </div>)
                    }
                    <Link to='gallery'>Go To Gallery</Link>
                    {props.loggedIn ?
                        (<div>
                            <p><a onClick={handleLogOut}>Log out</a></p>
                        </div>) :
                        (<div>
                            <p><Link to=''>Sign in</Link></p>
                            <p><Link to='/signup'>Sign up</Link></p>
                        </div>)
                    }
                    <div>
                        <Link to={''}>Home</Link>
                    </div>
                </div>
                <div className="posts">
                    <NewPost />
                    <Posts loggedIn={props.loggedIn} _id={props._id} />
                </div>
            </div>
    )
};

export default Blog;