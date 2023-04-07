import React, {useEffect, useState}  from "react";
import './Feed.css';
//Redux imports
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../store/redditSlice";
//Component import
import { Post } from "./Post";
import { ExpandedPost } from "./ExpandedPost";
//Framer motion imports 
import { motion, AnimatePresence } from "framer-motion";

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

    const [selectedId, setSelectedId] = useState(null);
    const [expandedData, setExpandedData] = useState(null);

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
                    <Post 
                    key={post.id}
                    index={index}
                    post={post}
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                    expandedData={expandedData}
                    setExpandedData={setExpandedData}
                    />
                 ))
            )
        }
    }

    return(
        <div className="feedContainer">
            <div className="feedWrapper">
                {renderPosts()}
            </div>
            {
                selectedId && (
                    <AnimatePresence>
                        <motion.div 
                        layoutId={selectedId}
                        className="expandedContainer">
                          <ExpandedPost 
                          setSelectedId={setSelectedId}
                          post={expandedData}/>
                        </motion.div>
                    </AnimatePresence>
                )
            }
        </div>
    )
}