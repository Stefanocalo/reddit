import React from "react";
//Loading skeleton
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export function CommentSkeleton() {
    return(
        <div className="commentWrapper">
            <div className="bubble">
                <div className="authorContainer">
                    <Skeleton style={{width: '5rem'}}/>
                </div>
                <div className="commentBody">
                    <Skeleton style={{width: Math.floor(Math.random()*80)+ 150}}/>
                    <Skeleton style={{width: Math.floor(Math.random()*80)+ 70}}/>
                    <Skeleton style={{width: Math.floor(Math.random()*80)+ 100}}/>
                    <Skeleton style={{width: Math.floor(Math.random()*80)+ 120}}/>
                </div>
            </div>
        </div>
    )
}