import React, {useEffect, useState}  from "react";
import '../Feed/Feed';
//Redux imports
import { useDispatch, useSelector } from "react-redux";
//Component import
import { Post } from "../Feed/Post";
import { ExpandedPost } from "../Feed/ExpandedPost";
import { PostSkeleton } from "../Feed/PostSkeleton";
//Framer motion imports 
import { motion, AnimatePresence } from "framer-motion";
//Api
import { getSearchResults } from "../../api/api";
import { useNavigate } from "react-router-dom";

export function SearchFeed() {

    const [selectedId, setSelectedId] = useState(null);
    const [expandedData, setExpandedData] = useState(null);
    const [expandedIndex, setExpandedIndex] = useState(null);

     //Component internal status
     const [status, setStatus] = useState({
        isLoading: false,
        isSuccess: false
    });
    //Get searchTerm from global state
    const searchQuery = useSelector(state => state.reddit.searchTerm);
    //Declare state variable to store search resutls
    const [results, setResults] = useState(null);

    const navigate = useNavigate();
    useEffect(() => {
        if(!searchQuery) {
            navigate('/');
        }
        try {
            setStatus({
                isLoading: true,
                isSuccess: false
            });
            const searchResults = getSearchResults(searchQuery);
            searchResults.then(resultList => setResults(resultList));
            setStatus({
                isLoading: false,
                isSuccess: true
            })
        } catch (error) {
            console.log(error);
            //Navigate to error page.
        }
    },[searchQuery])

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
        if(status.isLoading) {
            return(
                <>
                   {
                    Array(20).fill(0).map((el,index) => (
                        <PostSkeleton key={index}/>
                    ))
                   }
                </>
            )
        }
        if (status.isSuccess) {
            if(results) {
                if(results.length > 0) {
                    return(
                        results.map((result, index) => (
                            <Post 
                            key={result.id}
                            index={index}
                            post={result}
                            selectedId={selectedId}
                            setSelectedId={setSelectedId}
                            expandedData={expandedData}
                            setExpandedData={setExpandedData}
                            setExpandedIndex={setExpandedIndex}
                            />
                        ))
                    )
                } else {
                    return(
                        <h4>No results for: {searchQuery} </h4>
                    )
                }
            }
                
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