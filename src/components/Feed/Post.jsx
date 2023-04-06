import React, { useEffect, useState } from "react";
import './Post.css';
import { motion, AnimatePresence } from "framer-motion";
//misc
import { replaceString } from "../../misc/varie";
import moment from "moment";
import { wordShortener } from "../../misc/varie";
//Redux imports
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthor } from "../../store/redditSlice";
//Components imports
import { Image } from "./Image";
import { Gallery } from "./Gallery";

export function Post({post, index}) {

    const [selectedId, setSelectedId] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [expanded, setExpanded] = useState(false);
    
    const isLightMode = useSelector(state => state.reddit.isLightMode);
    

    (post.media_metadata && post.gallery_data) &&console.log(replaceString(post.media_metadata.voua9qs387sa1?.p[2].u));
    return(
        <motion.div
        className="postWrapper"
        initial={{y: 80}}
        whileInView={{y: 0}}
        >
            <div className="infoSection">
                <span
                style={{color: isLightMode ? 'black' : 'white'}}
                className="author">{post.subreddit_name_prefixed}</span>
                <span 
                style={{color: isLightMode ? 'black' : 'white'}}
                className='author'>Posted by: {post.author} . {moment.unix(post.created_utc).fromNow()}</span>
            </div>
            <div className="titleContainer">
                <span 
                style={{color: isLightMode ? 'black' : 'white'}}
                className="postTitle">{post.title}</span>
            </div>
            {
                post.post_hint === 'image' && 
                <Image post={post}/>
            }
            {
                (post.gallery_data && post.gallery_data) &&
                <Gallery post={post}/>
                
            }
            {
                post.selftext &&
                <div className="selfTextContainer">
                    {
                        post.selftext.length > 300 && (
                            <>
                            <p
                            style={{color: isLightMode ? 'black' : 'white'}}
                            >{wordShortener(post.selftext, expanded)}</p>
                            <div className="expand">
                                <span
                                role='button'
                                onClick={() => setExpanded(!expanded)}
                                className="show"
                                style={{color: isLightMode ? 'black' : 'white'}}
                                >{expanded ? 'Show less...' : 'Show more...'}</span>
                            </div>
                            </>
                        )
                    }
                </div>
            }

        </motion.div>
    )
}