import React, {useEffect, useState}  from "react";
import './Feed.css';
//Redux imports
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../store/redditSlice";
//Component import
import { Post } from "./Post";
import { ExpandedPost } from "./ExpandedPost";
import { PostSkeleton } from "./PostSkeleton";
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
    const [expandedIndex, setExpandedIndex] = useState(null);

    //Blocking feed scroll while a post is expanded
    useEffect(() => {
        if(selectedId) {
            document.body.style.overflow = 'hidden';
        }
        if(selectedId === null) {
            document.body.style.overflow = 'auto';
        }
    },[selectedId])

    function renderPosts() {
        if(isLoading) {
            return(
                <>
                   {
                    Array(20).fill(0).map((el,index) => (
                        <PostSkeleton key={index}/>
                    ))
                   }
                </>
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
                    setExpandedIndex={setExpandedIndex}
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
                          expandedIndex={expandedIndex}
                          post={expandedData}/>
                        </motion.div>
                    </AnimatePresence>
                )
            }
        </div>
    )
}