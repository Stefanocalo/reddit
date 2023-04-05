import React, {useEffect}  from "react";
import './Feed.css';
//Redux imports
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../store/redditSlice";
//Component import
import { Post } from "./Post";

export function Feed() {
    //Fetch reddits based on selectedSubreddit
    const dispatch = useDispatch();
    const selectedSubReddit = useSelector(state => state.reddit.selectedSubReddits);
    const posts = useSelector(state => state.reddit.posts);
    useEffect(() => {
        dispatch(fetchPosts(selectedSubReddit));
    },[selectedSubReddit]);

    return(
        <div className="feedContainer">
            <div className="feedWrapper">
                {posts.map(post => (
                   <Post key={post.id} post={post}/>
                ))}
            </div>
        </div>
    )
}