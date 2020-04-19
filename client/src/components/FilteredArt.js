import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../utils/GlobalState';

const FilteredArt = props => {

    // const [state, dispatch] = useUserContext;

    console.log('props in FilteredArt', props.location.state.works)

    // const toFilter = props.location.state.works;

    // const filtered = toFilter.filter(post => {
    //     console.log(post.tags)
    //     post.tags.map(tag => )
    //     if (post.tags === props.match.params.tag) {
    //         return post
    //     }
    // })

    const mapTags = props.location.state.works.map(post => {
        return post.tags
    })

    
    const tags = []
    mapTags.filter(tag => {
        for (let i = 0; i < tag.length; i++) {
            if (tag[i] === props.match.params.tag) {
                tags.push(tag)
            }
        }
    })
    
    console.log('filtered tags', tags)

    const posts = props.location.state.works.filter(post => {
        console.log('post in posts filter', post)
        for (let res of tags) {
            if (post.tags === res) {
                return post
            }
        }
        
    })

    console.log("posts if they match???", posts)
    // console.log('state in FilteredArt', state)
    // useEffect(() => {
        
    // }, [])

    return (
        <div>
            <div>
                <h2>Here's all artworks tagged '{props.match.params.tag}'</h2>
            </div>
            <div className="gallery">
                {posts.map(post => (
                    <div key={post._id} className="gall">
                        <div className="gall-thumb">
                        <Link to={{
                                pathname: 'work/' + post._id,
                                state: {
                                    postId: post._id,
                                    postTitle: post.title,
                                    postImg: post.img,
                                    postDesc: post.description,
                                    postTags: post.tags
                                }
                            }}>
                                <img src={post.img} alt={post.title} />
                            </Link>
                        </div>
                        <div>
                            <h2><i>{post.title}</i></h2>
                        </div>
                        <div>
                            {post.description}
                        </div>
                        <div className="gall-tags">
                            {post.tags}
                        </div>
                    </div>
                ))}
            </div>
        </div>
        
    )
}

export default FilteredArt;