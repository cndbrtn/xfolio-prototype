import React from 'react';
import { Link } from 'react-router-dom';

const Tags = props => {
    // console.log('tag props', props)
    const { tags } = props;
    return (
        <Link to={{
            pathname: 'gallery/' + tags,
            state: {
                works: props.works
            }
        }} key={tags}>{tags}</Link>        
    )
}

export default Tags;