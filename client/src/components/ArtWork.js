import React, { useEffect } from 'react';
import { useUserContext } from '../utils/GlobalState';
import API from '../utils/API';
import { SET_CURRENT_USER } from '../utils/actions';

const ArtWork = ({ match }) => {

    const [state, dispatch] = useUserContext();

    const pathId = window.location.pathname.split('/')
    console.log(pathId)
    const { params } = match;
    console.log('props.match', params)

    useEffect(() => {
        API.getArt(params.username)
            .then(works => {
                const art = works.data.works
                console.log('works in detail', works.data.works)
                art.filter(post => {
                    console.log(post._id)
                    if (post._id === params.id) {
                        dispatch({
                            ...state,
                            type: SET_CURRENT_USER,
                            postId: post._id,
                            postImg: post.img,
                            postTitle: post.title,
                            postDesc: post.description,
                            postTags: post.tags
                        })
                    }
                })
        })
    }, [])

    console.log('state in detail', state)
    return (
        <div className="detail">
            <div className="full-info">
            <div><h1>{state.postTitle}</h1></div>
            <div>{state.postDesc}</div>
            <div className="tags"><p>Tagged: {state.postTags.map(tag => (
                <span key={tag}>{tag} </span>
            ))}
            </p>
            </div>
            </div>
            <div className="full-image">
                <img className='full-image' src={state.postImg} alt={state.postTitle} />
            </div>
        </div>
    )
}

export default ArtWork;