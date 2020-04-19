import React, { useEffect, useState } from 'react';
// import { useUserContext } from '../utils/GlobalState';
import API from '../utils/API';
// import { SET_CURRENT_USER } from '../utils/actions';

const ArtWork = ({ match }) => {

    const [art, setArt] = useState();

    // const pathId = window.location.pathname.split('/')
    // console.log(pathId)
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
                        setArt({
                            // ...state,
                            // type: SET_CURRENT_USER,
                            user: post.user,
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

    console.log('state in detail', art)
    return (
        <div className = "detail" >
            {art ? (
                <div>
                <div>{art.postTitle}</div>
                <div>
                    <img src={art.postImg} alt={art.postTitle} />
                </div>
                <div>{art.postDesc}</div>
                <div>{art.postTags.map(tag => (
                    <span key={tag}>{tag} </span>
                ))}
                    </div>
                    </div>
        ) : (<h3>Loading...</h3>)}
        </div >
        
    )
}

export default ArtWork;