import React, { useEffect } from 'react';
import { useUserContext } from '../utils/GlobalState';
import { GET_CURRENT_USER } from '../utils/actions';

const Blog = (props) => {
    console.log('props in blog', props)
    const [state, dispatch] = useUserContext();
    
    // useEffect(() => {
    //     dispatch({ type: GET_CURRENT_USER })
    // }, [])
    console.log('state in blog after login', state);
    
    return (
        <div className="container blog">
            <div>
                <h1>Hello {state.username}!</h1>
            </div>
            
        </div>
    )
};

export default Blog;