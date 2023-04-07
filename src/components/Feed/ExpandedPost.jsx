import React, {useState, useEffect} from "react"; 
import './ExpandedPost.css';
//React-icons imports
import {BiCommentDetail} from 'react-icons/bi';
import {AiOutlineCloseCircle} from 'react-icons/ai';
//misc
import moment from "moment";
//Redux imports
import { useSelector } from "react-redux";
//Components imports
import { Gallery } from "./Gallery";
import { Image } from "./Image";

export function ExpandedPost({post, setSelectedId}) {

    const isLightMode = useSelector(state => state.reddit.isLightMode);
    return(
        <div className="expandedWrapper">
            <div 
            style={{backgroundColor: isLightMode ? 'white' : 'black'}}
            className="expandedPostWrapper">
                <div className="postWrapper">
                    <div 
                    className="expandedInfoSection">
                        <div className='info'>
                            <span
                            style={{color: isLightMode ? 'black' : 'white'}}
                            className="author">{post.subreddit_name_prefixed}</span>
                            <span 
                            style={{color: isLightMode ? 'black' : 'white'}}
                            className='author'>Posted by: {post.author} . {moment.unix(post.created_utc).fromNow()}</span>
                        </div>
                        <div 
                        onClick={() => {
                            setSelectedId(null)
                        }}
                        className="back">
                            <AiOutlineCloseCircle style={{fontSize: '2rem'}}/>
                        </div>
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
                            <span
                            style={{color: isLightMode ? 'black' : 'white'}}
                            >{post.selftext}</span>
                        </div>
                    }
                    <div className="actionSectionContainer">
                        <div className="upsSection">  
                            <span style={{color: isLightMode ? 'black' : 'white', padding: '0 0.3rem'}}
                            >Ups: {post.ups}</span>   
                        </div>
                        <div 
                        className="commentSection">
                            <BiCommentDetail  style={{fontSize: '1.2rem', color: isLightMode ? 'black' : 'white'}}/>
                            <span style={{color: isLightMode ? 'black' : 'white', padding: '0 0.3rem'}}>{post.num_comments}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}