import React, { useEffect } from 'react';
import { useUserContext } from '../utils/GlobalState';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Posts from './Post';
import NewPost from './NewPost';
import { GALLERY_PROPS } from '../utils/actions';
import API from '../utils/API'

const Blog = (props) => {
    const [state, dispatch] = useUserContext();
    console.log('props in blog', props)
    // console.log()
    
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
        
        return (
            <div className="container blog">
                <div className="profile">
                    <h1>Hello {props.username}!</h1>
                    <NewPost />
                    <Link to='gallery'>Gallery Page</Link>
                </div>
                <div className="posts">
                    <Posts />
                </div>
            </div>
    )
};

export default Blog;