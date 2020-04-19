import React, { useEffect } from 'react';
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
                <h1>All artworks tagged '{props.match.params.tag}'</h1>
            </div>
            <div>
                {posts.map(post => (
                    <div key={post._id}>
                        <div>
                            <h1>{post.title}</h1>
                        </div>
                        <div>
                            <img src={post.img} alt={post.title} />
                        </div>
                        <div>
                            {post.description}
                        </div>
                        <div>
                            {post.tags}
                        </div>
                    </div>
                ))}
            </div>
        </div>
        
    )
}

export default FilteredArt;