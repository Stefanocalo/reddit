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

    //Access global state values
    const isLoading = useSelector(state => state.reddit.isLoading);
    const isError = useSelector(state => state.reddit.error);

    function renderPosts() {
        if(isLoading) {
            return(
                <div>
                    <p>...Loading</p>
                </div>
            )
        } else if(isError) {
            <div>
                <p>Oh no! Something went wrong</p>
            </div>
        } else {
            return(
                posts.map((post, index) => (
                    <Post key={post.id} index={index} post={post}/>
                 ))
            )
        }
    }

    return(
        <div className="feedContainer">
            <div className="feedWrapper">
                {renderPosts()}
            </div>
        </div>
    )
}