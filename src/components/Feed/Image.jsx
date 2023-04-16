import React, {useState, useEffect} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { replaceString } from "../../misc/varie";
import './Post.css';
import {AiOutlineCloseCircle} from 'react-icons/ai';

export function Image({post}) {

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

    const [opacity, setOpacity] = useState(1);
    console.log(opacity);

    return(
        <>
        <div className="postImgContainer">
            <motion.img
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
                    style={{    backgroundColor: `rgba(0, 0, 0, ${opacity})`
                    }}
                    className="expandedContainer">
                        <motion.div
                        onClick={() =>setSelectedId(null)}
                        className="close">
                            <AiOutlineCloseCircle style={{fontSize: '2rem'}}/>
                        </motion.div>
                        <motion.img 
                        className="expandedImage"
                        drag={true}
                        onDrag={(event, info) => {
                            console.log(info.offset.y);
                            setOpacity(2.5 - (info.offset.y * 0.008));
                        }}
                        layoutId={selectedId}
                        onDragEnd={() => {
                            setSelectedId(null);
                        }}
                        src={url}/>
                    </motion.div>
                </AnimatePresence>
            </AnimatePresence>
        }
        </>
    )
};