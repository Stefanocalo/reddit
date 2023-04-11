import React from "react";
//Loading skeleton
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './Post.css';
//React-icons imports
import {BiCommentDetail} from 'react-icons/bi';
import {TbArrowBigUp, TbArrowBigDown} from 'react-icons/tb';
import { useSelector } from "react-redux";

export function PostSkeleton() {
    const isLightMode = useSelector(state => state.reddit.isLightMode);
    return(
        <div
        className="postWrapper"
        style={{backgroundColor: isLightMode ? 'white' : 'black'}}
        >
            <div 
            className="infoSection">
                <Skeleton style={{width: '4rem'}}/>
                <Skeleton style={{width: '2rem'}}/>
            </div>
            <div className="titleContainer">
                <Skeleton style={{width: '20rem'}}/>
            </div>
            <div className="selfTextContainer">
                <Skeleton count={5}/>
            </div>
            <div className="actionSectionContainer">
                <div className="upsSection">
                    <div 
                    className='up'>
                        <TbArrowBigUp style={{fontSize: '1.6rem', color: isLightMode ? 'black' : 'white'}}/>
                    </div>
                    <Skeleton style={{width: '1rem',margin: '0 0.5rem'}}/>
                    <div 
                    className='down'>
                        <TbArrowBigDown style={{fontSize: '1.6rem', color: isLightMode ? 'black' : 'white'}} />
                    </div>
                   
                </div>
                <div 
                className="commentSection">
                    <BiCommentDetail  style={{fontSize: '1.2rem', color: isLightMode ? 'black' : 'white'}}/>
                    <Skeleton style={{width: '1rem',margin: '0 0.5rem'}}/>
                </div>
            </div>
        </div>
    )
}