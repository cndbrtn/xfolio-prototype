import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
// import { useUserContext } from '../utils/GlobalState';
import API from '../utils/API'

const Gallery = props => {
    const [worksState, setWorksState] = useState({
        works: []
    });
    // const [state, dispatch] = useUserContext();
    // const history = useHistory();
    // console.log('props in gallery', props)
    // const uploadLink =  history.push(`/upload`)

    useEffect(() => {
        console.log('props', props._id)
        API.getUser(props._id)
            .then(res => {
                console.log('gallery get res', res.data)
                setWorksState({
                    works: res.data.works
                })
             })
    }, [props])

    console.log('worksState', worksState.works)
    const { works } = worksState;
    console.log('works', works)

    if (!works || !works.length) {
        return (
            <div>
                <h3>No posts yet!</h3>
                <Link to={'upload'}>Upload an image</Link>
                <br />
                <Link to={'journal'}>Go to your Jounral</Link>
            </div>
        )
    } else {
        return (
            <div>
                <Link to={'upload'}>Upload new artwork</Link>
                <br />
                <Link to={'journal'}>Go to your Jounral</Link>
                {works.map(post => (
                    <div key={post._id}>
                        <div>
                            <img src={post.img} alt={post.title} />
                        </div>
                        <div>
                            {post.title}
                        </div>
                        <div>
                            {post.description}
                        </div>
                        <div>
                            {post.tags}
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default Gallery;