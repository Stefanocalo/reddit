import React, {useState, useEffect, useRef} from "react";
import { motion, AnimatePresence, useTransform, useMotionValue, useMotionValueEvent } from "framer-motion";
import { replaceString } from "../../misc/varie";
import './Post.css';
import {AiOutlineCloseCircle} from 'react-icons/ai';

export function Image({post}) {

    const exp = useRef(null);

    const [selectedId, setSelectedId] = useState(null);
    const [url, setUrl] = useState(null);

    //Blocking feed scroll while a post is expanded
    useEffect(() => {
        if(selectedId) {
            document.body.style.overflow = 'hidden';
        }
        if(selectedId === null) {
            document.body.style.overflow = 'auto';
        }
    },[selectedId])

    const focusOut = document.getElementById('id01');
    function exitClick(event) {
        event.target == focusOut && setSelectedId(null)
    }

    return(
        <>
        <div className="postImgContainer">
            <motion.img
            ref={exp}
            layoutId={post.preview.images[0].id} 
            onClick={() => {
                setSelectedId(post.preview.images[0].id);
                setUrl(replaceString(post.preview.images[0].source.url));
            }}
            className="postImage" src={replaceString(post.preview.images[0].source.url)}/>
        </div>
        {
            selectedId && 
            <AnimatePresence>
                <AnimatePresence>
                    <motion.div
                    ref={exp}
                    id='id01'
                    className="expandedContainer"
                    onClick={(e) => exitClick(e)}
                    >
                        <motion.div
                        onClick={() =>setSelectedId(null)}
                        className="close">
                            <AiOutlineCloseCircle style={{fontSize: '2rem'}}/>
                        </motion.div>
                        <motion.img 
                        className="expandedImage"
                        drag={'y'}
                        dragSnapToOrigin={true}
                        dragConstraints={{ left: 0, right: 0}}
                        onPanEnd={(e, panInfo) => {
                            if(panInfo.offset.y > 190 || panInfo.offset.y < -190) {
                                setSelectedId(null);
                            }
                        }}
                        layoutId={selectedId}
                       
                        src={url}/>
                    </motion.div>
                </AnimatePresence>
            </AnimatePresence>
        }
        </>
    )
};