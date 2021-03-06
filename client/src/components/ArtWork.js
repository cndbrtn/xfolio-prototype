import React, { useEffect, useState } from 'react';
import API from '../utils/API';
import { Link } from 'react-router-dom';
const ArtWork = props => {
    // console.log('props.match', props)

    const art = props.location.state

    // console.log('state from props', art)

    // console.log('art state in detail', art)
    return (
        <div className="detail">
            {art ? (
                <div className="detail-box">
                    <div className="full-info">
                    <div><h1>{art.postTitle}</h1></div>
                    <div>{art.postDesc}</div>
                    <div className="tags"><p>Tagged: {art.postTags.map(tag => (
                        <span key={tag}>{tag} </span>
                        ))}
                        </p>
                        </div>
                        <p><Link to={'../../../' + props.match.params.username + '/gallery'}>Back to gallery</Link></p>
                        <p><Link to={''}>Home</Link></p>
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