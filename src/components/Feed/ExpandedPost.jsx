import React, {useState, useEffect} from "react"; 
import './ExpandedPost.css';
//React-icons imports
import {BiCommentDetail} from 'react-icons/bi';
import {AiOutlineCloseCircle} from 'react-icons/ai';
//misc
import moment from "moment";
//Redux imports
import { useDispatch, useSelector } from "react-redux";
import { fetchComment, toggleShowingComments } from "../../store/redditSlice";
//Components imports
import { Gallery } from "./Gallery";
import { Image } from "./Image";
import { Comments } from "./Comment";
//Miscs imports 
import { wordShortener } from "../../misc/varie";
export function ExpandedPost({post,selectedId, setSelectedId, expandedIndex}) {

    const isLightMode = useSelector(state => state.reddit.isLightMode);
    const [expanded, setExpanded] = useState(false);

    console.log(expandedIndex);

    //Blocking feed scroll while a post is expanded
    useEffect(() => {
        if(selectedId) {
            document.body.style.overflow = 'hidden';
        }
        if(selectedId === null) {
            document.body.style.overflow = 'auto';
        }
    },[selectedId]);

    //Toggle comments;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchComment(expandedIndex, post.permalink))
    },[expandedIndex])

    function renderComments() {
        if (post.errorComments) {
            return (
              <span>OPS! Something went wrong.</span>
            );
        }
        if (post.loadingComments) {
            return( <span>Loading comments...</span>)
        }
      
        if (post.showingComments) {
            return(
                <div>
                    {post.comments.map((comment, index) => (
                        <Comments comment={comment} key={comment.id} />
                    ))}
                </div>
            )
        }
  
    }

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
                    <div className="expandedMainContent">
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
                        <div className="commentsContainer">
                            {post.showingComments && <>
                                {renderComments()}
                            </>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}