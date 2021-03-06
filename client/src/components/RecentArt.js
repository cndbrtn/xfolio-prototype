import React from 'react'
import { Link } from 'react-router-dom';

const RecentArt = props => {
    const mapTags = props.works.works.map(post => {
        return post.tags
    })

    const tags = []
    mapTags.filter(tag => {
        for (let i = 0; i < tag.length; i++) {
            if (tag[i] === "nsfw") {
                tags.push(tag)
            }
        }
    })
    // console.log('filtered tags', tags)
    const posts = props.works.works.filter(post => {
        // console.log('post in posts filter', post)
        for (let res of tags) {
            if (post.tags === res) {
                return post
            }
        }
    })
    // console.log('filtered posts in recentart', posts.img)
    // console.log('props in RecentArt.js', props);

    const filteredPosts= []
    const nsfwFilter = props.works.works.filter(post => {
        // console.log('post inside nsfwFilter', post)
        for (let res of tags) {
            if (post.tags === res && !props.loggedIn) {
                post.img = '/images/r18-warning.jpg'
                filteredPosts.push(post)
            }
        }
        return post
    })
    // console.log('nsfwFilter', nsfwFilter)
    return (
        <div className="recent-art">
            <h1>Recently uploaded art:</h1>
            <div className="recent-box">
            {props.works.works.map(post => (
                 <div className="post" key={post._id}>
                    <div className="gall-thumb">
                        <Link to={{
                            pathname: `${post.user.username}/gallery/work/${post._id}`,
                            state: {
                                postId: post._id,
                                postTitle: post.title,
                                postImg: post.img,
                                postDesc: post.description,
                                postTags: post.tags
                            }
                        }}><img src={post.img} alt={post._id} /></Link>
                    </div>       
                    <div>
                        <h2>{post.title}</h2>
                    </div>
                 </div>
            ))}
            </div>
        </div>
        )
}

export default RecentArt;