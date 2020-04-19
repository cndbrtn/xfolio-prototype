import React from 'react';


const Container = (props) => {
    // console.log('props.children', props.children)
    return (
        <div className="router-container">
            {props.children} {props.loggedIn}
        </div>
    )
};

export default Container;

