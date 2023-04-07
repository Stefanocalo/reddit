import React from "react";
import moment from "moment";
import './Comments.css';
import { useSelector } from "react-redux";

export const Comments = ({comment, id}) => {
    const isLightMode = useSelector((state) => state.reddit.isLightMode);

    return(
        <div key={id}>
            <div className="commentWrapper">
                <div className="bubble">
                    <div className="authorContainer">
                        <span 
                        style={{color: isLightMode ? 'black' : 'white'}}
                        className="commentAuthor"> {comment.author} </span>
                        <span 
                        style={{color: isLightMode ? 'black' : 'white'}}
                        className="time"> . {moment.unix(comment.created).fromNow()}</span>
                    </div>
                    <p 
                    style={{color: isLightMode ? 'black' : 'white'}}
                    className="commentBody">{comment.body}</p>
                </div>
            </div>
            {comment.replies && comment.replies.data.children.map((reply) => {
                if(reply.data.body) {
                    return  <div className="replyContainer" key={reply.data.id}>
                    <div className= "replyWrapper">
                        <div className="authorContainer">
                            <span 
                            style={{color: isLightMode ? 'black' : 'white'}}
                            className="commentAuthor"> {reply.data.author} </span>
                            <span 
                            style={{color: isLightMode ? 'black' : 'white'}}
                            className="time"> . {moment.unix(reply.data.created).fromNow()}</span>
                        </div>
                        <p 
                        style={{color: isLightMode ? 'black' : 'white'}}
                        className="commentBody">{reply.data.body}</p>
                    </div>
                </div>
                }
               
        })}
        </div>

    )
}
