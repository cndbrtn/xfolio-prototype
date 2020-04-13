import React, { useEffect } from 'react';
import { useUserContext } from '../utils/GlobalState';
import { Link, useHistory } from 'react-router-dom';
// import { GET_CURRENT_USER } from '../utils/actions';



const Posts = () => {
    const [state, dispatch] = useUserContext();
    const history = useHistory();
    const galleryLink = history.push(`/gallery`);

    const { journal, works } = state;
    if (!journal.length) {
        return (
            <div>
                <h3>You don't have any posts yet</h3>
                <Link to={galleryLink}>Gallery Page</Link>
            </div>
        )
    } else {
        return (
            <div>
                {journal.map(post => (
                        <div>
                            <h2>{post.title}</h2>
                            <div>
                                {post.body}
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

const Blog = (props) => {
    const [state, dispatch] = useUserContext();
    console.log('props in blog', props)
    
    

    // journal.map(post => {
    //     console.log('posts', post)
    //     if (!post) return console.log('no posts yet')
    // })
    
    console.log('state in blog after login', state);
    
  
    return (
        <div className="container blog">
            <div>
                <h1>Hello {state.username}!</h1>
            </div>
            <Posts />
        </div>
    )
};

export default Blog;