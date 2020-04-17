import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
        // console.log('props', props._id)
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
                    _id: res.data._id,
                    uploaded: false
                })
             })
    }, [props, state.uploaded])

    
    // console.log('worksState', worksState.works)
    const { works } = worksState;
    // console.log('works', works)

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

          <div className="gallery-box">
                <div className ="profile">
                    <p>Welcome to Xfolio:</p>
                <Upload />

                <br />

                <Link to={'blog'}>Go to your Jounral</Link>
                </div>
                <div className="gallery">
                {works.map(post => (
                    <div className="gall" key={post._id}>
                        <div className="gall-thumb">
                            <img src={post.img} alt={post.title} />
                        </div>
                        <div className="gall-info">
                        <div>
                            <i>{post.title}</i>
                        </div>
                        <div className="gall-descrip">
                            {post.description}
                        </div>
                        <div className="gall-tags">
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