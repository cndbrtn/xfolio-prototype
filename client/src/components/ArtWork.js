import React, { useEffect, useState } from 'react';
import API from '../utils/API';

const ArtWork = props => {

    // const [art, setArt] = useState();
    // const pathId = window.location.pathname.split('/')
    // console.log(pathId)
    console.log('props.match', props)

    const art = props.location.state

    console.log('state from props', art)
    // useEffect(() => {
    //     API.getArt(props.match.params.username)
    //         .then(works => {
    //             const arts = works.data.works
    //             console.log('works in detail', works.data.works)
    //             arts.filter(post => {
    //                 // console.log(post._id)
    //                 if (post._id === props.match.params.id) {
    //                     setArt({
    //                         user: post.user,
    //                         postId: post._id,
    //                         postImg: post.img,
    //                         postTitle: post.title,
    //                         postDesc: post.description,
    //                         postTags: post.tags
    //                     })
    //                 }
    //             })
    //     })
    // }, [])

    // console.log('art state in detail', art)
    return (
        <div className="detail">
            {art ? (
                <div className="full-info">
                <div><h1>{art.postTitle}</h1></div>
                <div>{art.postDesc}</div>
                <div className="tags"><p>Tagged: {art.postTags.map(tag => (
                    <span key={tag}>{tag} </span>
                ))}
                    </p>
                    </div>
                <div className="full-image">
                    <img className="full-image" src={art.postImg} alt={art.postTitle} />
                </div>
                    </div>
        ) : (<h3>Loading...</h3>)}
        </div >
    )
}

export default ArtWork;