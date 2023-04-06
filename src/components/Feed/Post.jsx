import React, { useEffect, useState } from "react";
import './Post.css';
import { motion, AnimatePresence } from "framer-motion";
//misc
import { replaceString } from "../../misc/varie";
//Redux imports
import { useDispatch } from "react-redux";
import { fetchAuthor } from "../../store/redditSlice";
//Components imports
import { Image } from "./Image";
import { Gallery } from "./Gallery";

export function Post({post, index}) {

    const [selectedId, setSelectedId] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    

    (post.media_metadata && post.gallery_data) &&console.log(replaceString(post.media_metadata.voua9qs387sa1?.p[2].u));
    return(
        <motion.div
        className="postWrapper"
        initial={{y: 80}}
        whileInView={{y: 0}}
        >
            <div className="infoSection">
               
                <span className='author'>{post.author}</span>
            </div>
            <div className="titleContainer">
                <span className="postTitle">{post.title}</span>
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
                    <span>{post.selftext}</span>
                </div>
            }

        </motion.div>
    )
}