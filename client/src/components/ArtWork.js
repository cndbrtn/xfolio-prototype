import React, { useEffect } from 'react';
import { useUserContext } from '../utils/GlobalState';

const ArtWork = () => {

    const [state, dispatch] = useUserContext();

    console.log('state in detail', state)
    return (
        <div className="detail">
            <div>{state.postTitle}</div>
            <div>
                <img src={state.postImg} alt={state.postTitle} />
            </div>
            <div>{state.postDesc}</div>
            <div>{state.postTags.map(tag => (
                <span key={tag}>{tag} </span>
            ))}
            </div>
        </div>
    )
}

export default ArtWork;