import React, { useState } from "react";
import './Post.css';
import { motion } from "framer-motion";
//misc
import moment from "moment";
import { wordShortener } from "../../misc/varie";
import { upsShortener } from "../../misc/varie";
//Redux imports
import { useSelector } from "react-redux";
//Components imports
import { Image } from "./Image";
import { Gallery } from "./Gallery";
import { Video } from "./Video";
//React-icons imports
import {BiCommentDetail} from 'react-icons/bi';
import {TbArrowBigUp, TbArrowBigDown} from 'react-icons/tb';

export function Post({post, index, setExpandedIndex, setSelectedId, setExpandedData}) {

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

    function handleExpand() {
        setSelectedId(post.id);
        setExpandedData(post);
        setExpandedIndex(index);
    }

    return(
        <motion.div
        layoutId={post.id}
        className="postWrapper"
        style={{backgroundColor: isLightMode ? 'white' : 'black'}}
        initial={{y: 80}}
        whileInView={{y: 0}}
        >
            <div 
            onClick={() => handleExpand()}
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
                post.secure_media && 
                <Video data={post.secure_media}/>
                   
            }
            {
                post.selftext &&
                <div className="selfTextContainer">
                    {
                        post.selftext.length > 300 ? (
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
                        ) :  
                        (
                            <p
                            style={{color: isLightMode ? 'black' : 'white'}}
                            >
                                {post.selftext}
                            </p>
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
                    >{voted ? upsShortener(post.ups + voted) : upsShortener(post.ups)}</span>
                    <div 
                    onClick={() => handleDownVote()}
                    className={voted === -1 ? 'downActive' : 'down'}>
                        <TbArrowBigDown style={{fontSize: '1.6rem', color: isLightMode ? 'black' : 'white'}} />
                    </div>
                   
                </div>
                <div 
                onClick={() => handleExpand()}
                className="commentSection">
                    <BiCommentDetail  style={{fontSize: '1.2rem', color: isLightMode ? 'black' : 'white'}}/>
                    <span style={{color: isLightMode ? 'black' : 'white', padding: '0 0.3rem'}}>{post.num_comments}</span>
                </div>
            </div>
        </motion.div>
    )
}