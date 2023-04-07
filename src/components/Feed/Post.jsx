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
//React-icons imports
import {BiCommentDetail} from 'react-icons/bi';
import {TbArrowBigUp, TbArrowBigDown} from 'react-icons/tb';

export function Post({post, index, selectedId, setSelectedId}) {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [expanded, setExpanded] = useState(false);
    const [voted, setVoted] = useState(null);
    
    const isLightMode = useSelector(state => state.reddit.isLightMode);

    function handleUpVote() {
        voted === 1 ? setVoted(null) : setVoted(1);
    }
    function handleDownVote() {
        voted === -1 ? setVoted(null) : setVoted(-1);
    }    

    return(
        <motion.div
        layoutId={post.id}
        className="postWrapper"
        initial={{y: 80}}
        whileInView={{y: 0}}
        >
            <div 
            onClick={() => setSelectedId(post.id)}
            className="infoSection">
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
            <div className="actionSectionContainer">
                <div className="upsSection">
                    <div 
                    onClick={() => handleUpVote()}
                    className={voted === 1 ? 'upActive' : 'up'}>
                        <TbArrowBigUp style={{fontSize: '1.6rem', color: isLightMode ? 'black' : 'white'}}/>
                    </div>
                    <span style={{color: isLightMode ? 'black' : 'white', padding: '0 0.3rem'}}
                    >{voted ? post.ups + voted : post.ups}</span>
                    <div 
                    onClick={() => handleDownVote()}
                    className={voted === -1 ? 'downActive' : 'down'}>
                        <TbArrowBigDown style={{fontSize: '1.6rem', color: isLightMode ? 'black' : 'white'}} />
                    </div>
                   
                </div>
                <div className="commentSection">
                    <BiCommentDetail  style={{fontSize: '1.2rem', color: isLightMode ? 'black' : 'white'}}/>
                    <span style={{color: isLightMode ? 'black' : 'white', padding: '0 0.3rem'}}>{post.num_comments}</span>
                </div>
            </div>
        </motion.div>
    )
}