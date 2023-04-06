import React, {useState} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { replaceString } from "../../misc/varie";
import './Post.css';
import {AiOutlineCloseCircle} from 'react-icons/ai';

export function Image({post}) {

    const [selectedId, setSelectedId] = useState(null);
    const [url, setUrl] = useState(null);

    return(
        <>
        <div className="postImgContainer">
            <motion.img
            layoutId={post.id} 
            onClick={() => {
                setSelectedId(post.id);
                setUrl(replaceString(post.preview.images[0].source.url));
            }}
            className="postImage" src={replaceString(post.preview.images[0].source.url)}/>
        </div>
        {
            selectedId && 
            <AnimatePresence>
                <AnimatePresence>
                    <motion.div
                    className="expandedContainer"
                    onClick={() =>setSelectedId(null)}>
                        <motion.div className="close">
                            <AiOutlineCloseCircle style={{fontSize: '2rem'}}/>
                        </motion.div>
                        <motion.img 
                        className="expandedImage"
                        drag={true}
                        layoutId={selectedId}
                        onDragEnd={() => setSelectedId(null)}
                        src={url}/>
                    </motion.div>
                </AnimatePresence>
            </AnimatePresence>
        }
        </>
    )
};