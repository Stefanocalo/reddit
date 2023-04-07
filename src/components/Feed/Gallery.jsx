import React, {useEffect, useState} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { replaceString } from "../../misc/varie";
import './Post.css';
import {AiOutlineCloseCircle} from 'react-icons/ai';
import {IoIosArrowForward, IoIosArrowBack} from 'react-icons/io';


export function Gallery({post}) {

    const [selectedId, setSelectedId] = useState(null);
    const [galleryData, setGalleryData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        post.gallery_data.items.map((element, index) => {
            galleryData[index] = replaceString(post.media_metadata[element.media_id].p[5]?.u);
        })
    },[post]);

    function handleBack() {
        if(currentIndex === 0) {
            setCurrentIndex(galleryData.length -1);
        } else {
            setCurrentIndex(prevState => prevState -1)
        }
    };

    function handleForward() {
        if(currentIndex === galleryData.length -1) {
            setCurrentIndex(0);
        } else {
            setCurrentIndex(prevState => prevState + 1)
        }
    }


    return(
        <>
        <div className="galleryContainer">
            { 
                post.gallery_data.items.map((element, index) => {
                const hdlUrl = post.media_metadata[element.media_id].p[5]?.u;
                const thumbnail = post.media_metadata[element.media_id].p[2]?.u;
                return(
                    <motion.img
                    key={element.media_id}
                    className="galleryImage"
                    onClick={() => {
                        setSelectedId(element.media_id);
                        setCurrentIndex(index);
                    }}
                    layoutId={element.media_id}
                    src={replaceString(thumbnail)}/>
                )
            })}
        </div>
        {
            selectedId &&
            <AnimatePresence>
                 <motion.div
                    className="expandedContainer">
                        <motion.div 
                        onClick={() =>setSelectedId(null)}
                        className="close">
                            <AiOutlineCloseCircle style={{fontSize: '2rem'}}/>
                        </motion.div>
                        <div 
                        onClick={() => handleBack()}
                        id='left'
                        className="imageButton">
                            <IoIosArrowBack className="icon"/>
                        </div>
                        <div 
                        onClick={() => handleForward()}
                        id='right'
                        className="imageButton">
                            <IoIosArrowForward className="icon"/>
                        </div>
                        <motion.img 
                        className="expandedImage"
                        drag={true}
                        layoutId={selectedId}
                        onDragEnd={() => setSelectedId(null)}
                        src={galleryData[currentIndex]}/>
                    </motion.div>
            </AnimatePresence>
        }
        </>
    )
}



