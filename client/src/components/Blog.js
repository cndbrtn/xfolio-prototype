import React, { useEffect } from 'react';
import { useUserContext } from '../utils/GlobalState';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Posts from './Post';
import NewPost from './NewPost';
import { GALLERY_PROPS } from '../utils/actions';
import API from '../utils/API'
// import { GET_CURRENT_USER } from '../utils/actions';



// const Posts = () => {

//     // useEffect(() => {
//     //     axios.get('/api/user/:username')
//     // }, [])
//     const [state, dispatch] = useUserContext();
//     const history = useHistory();
//     const galleryLink = history.push(`/gallery`);

//     const { journal, works } = state;
//     if (!journal.length) {
//         return (
//             <div>
//                 <h3>You don't have any posts yet</h3>
//                 <Link to={galleryLink}>Gallery Page</Link>
//             </div>
//         )
//     } else {
//         return (
//             <div>
//                 {journal.map(post => (
//                         <div>
//                             <h2>{post.title}</h2>
//                             <div>
//                                 {post.body}
//                             </div>
//                             <div>
//                                 {post.tags}
//                             </div>
//                         </div>
//                     ))}
//             </div>
//         )
//     }
// }

const Blog = (props) => {
    const [state, dispatch] = useUserContext();
    console.log('props in blog', props)
    // console.log()
    
    const url = window.location.toString().split('/');
    console.log('url', url[3])

    // useEffect(() => {
    //     dispatch({
    //         ...state,
    //         type: GALLERY_PROPS,
    //         username: props.username,
    //         _id: props._id
    //     })
    // }, [props])
    
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
            <div>
                <h1>Hello {props.username}!</h1>
            </div>
            <NewPost />
            <Posts />
        </div>
    )
};

export default Blog;