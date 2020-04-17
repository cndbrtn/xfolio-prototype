import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { useUserContext } from '../utils/GlobalState';
import API from '../utils/API';
import Upload from './Upload'
import { GALLERY_PROPS } from '../utils/actions';


const Gallery = props => {
    const [state, dispatch] = useUserContext();
    const [worksState, setWorksState] = useState({
        works: []
    });
    
    

    // const history = useHistory();
    console.log('props in gallery', props)
    // const uploadLink =  history.push(`/upload`)
    console.log('state', state)

    useEffect(() => {
        console.log('props', props._id)
        API.getUser(props.username)
            .then(res => {
                console.log('gallery get res', res.data)
                setWorksState({
                    works: res.data.works
                });
                dispatch({
                    ...state,
                    type: GALLERY_PROPS,
                    username: res.data.username,
                    _id: res.data._id
                })
             })
    }, [props, state.uploaded])

    
    // console.log('worksState', worksState.works)
    const { works } = worksState;
    console.log('works', works)

    if (!works || !works.length) {
        return (
            <div>
                <Upload />
                <h3>No posts yet!</h3>
                {/* <Link to={'upload'}>Upload an image</Link>
                <br /> */}
                <Link to={'blog'}>Go to your blog page</Link>
            </div>
        )
    } else {
        return (

          <div class="gallery-box">
                <div class ="profile">
                    <p>Welcome to Xfolio:</p>
                <Upload />

                <br />

                <Link to={'blog'}>Go to your Jounral</Link>
                </div>
                <div class="gallery">
                {works.map(post => (
                    <div class="gall" key={post._id}>
                        <div class="gall-thumb">
                            <img src={post.img} alt={post.title} />
                        </div>
                        <div class="gall-info">
                        <div>
                            <i>{post.title}</i>
                        </div>
                        <div class="gall-descrip">
                            {post.description}
                        </div>
                        <div class="gall-tags">
                            {post.tags}
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