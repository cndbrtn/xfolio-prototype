import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const FilteredArt = props => {
    // console.log('props in FilteredArt', props.location.state.works)

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
    // console.log('filtered tags', tags)

    const posts = props.location.state.works.filter(post => {
        // console.log('post in posts filter', post)
        for (let res of tags) {
            if (post.tags === res) {
                return post
            }
        }        
    })
    // console.log("posts if they match???", posts)
    // console.log('state in FilteredArt', state)

    if (!posts.length) { 
        return (
            <div className="detail-box">
            <div className="profile">
                <h2>Here's all artworks tagged '{props.match.params.tag}'</h2>
                <div>
                    <p><Link to={'../../' + props.match.params.username + '/gallery'}>Go back</Link></p>
                </div>
            </div>
            <div className="gallery">
                <h1>No posts tagged '{props.match.params.tag}' yet</h1>
            </div>
            </div>
        )
    } else {
        return (
            <div className="gallery-box">
                <div className="profile">
                    <h2>Here's all artworks tagged '{props.match.params.tag}'</h2>
                    <div>
                        <p><Link to={'../../' + props.match.params.username + '/gallery'}>Go back</Link></p>
                    </div>
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
}

export default FilteredArt;