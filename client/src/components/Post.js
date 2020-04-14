import React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../utils/GlobalState';

const Posts = () => {

    // useEffect(() => {
    //     axios.get('/api/user/:username')
    // }, [])
    const [state, dispatch] = useUserContext();
    // const history = useHistory();
    // const galleryLink = history.push(`/gallery`);

    const { journal, works } = state;
    if (!journal.length) {
        return (
            <div>
                <h3>You don't have any posts yet</h3>
                <Link to='gallery'>Gallery Page</Link>
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

export default Posts;