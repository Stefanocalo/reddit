import React, {useEffect, useState} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { replaceString } from "../../misc/varie";
import './Post.css';
import {AiOutlineCloseCircle} from 'react-icons/ai';
import {IoIosArrowForward, IoIosArrowBack} from 'react-icons/io';
import { useSelector } from "react-redux";


export function Gallery({post}) {

    const [selectedId, setSelectedId] = useState(null);
    const [galleryData, setGalleryData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const isLightMode = useSelector(state => state.reddit.isLightMode);

    //Blocking feed scroll while a post is expanded
    useEffect(() => {
        if(selectedId) {
            document.body.style.overflow = 'hidden';
        }
        if(selectedId === null) {
            document.body.style.overflow = 'auto';
        }
    },[selectedId])


    useEffect(() => {
        post.gallery_data.items.map((element, index) => {
            galleryData[index] = {
                hdlUrl: replaceString(post.media_metadata[element.media_id].p[5]?.u),
                preview: replaceString(post.media_metadata[element.media_id].p[2]?.u),
                media_id: element.media_id
            }
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
            <div className="indicatorContainer">
                <span
                className="indicator"
                style={{color: isLightMode ? 'black' : 'white'}}
                > {currentIndex + 1}/{galleryData.length}</span>
            </div>
            <div className="inlineflex">
                <div 
                    onClick={() => handleBack()}
                    className="galleryControls">
                        <IoIosArrowBack className="icon"/>
                </div>
                {
                    galleryData.length > 0 && <motion.img
                    className="postImage"
                    onClick={() => {
                        setSelectedId(galleryData[currentIndex].media_id);
                    }}
                    layoutId={galleryData[currentIndex].media_id}
                    src={galleryData[currentIndex].preview}/>
                }
                <div 
                onClick={() => handleForward()}
                className="galleryControls">
                    <IoIosArrowForward className="icon"/>
                </div>
            </div>
            <div className="dotContainer">
               {galleryData.map((item, index) => (
                <div 
                onClick={() => setCurrentIndex(index)}
                key={index} className={index === currentIndex ? 'activeDot' : 'dot'}></div>
               ))}
            </div>
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
                        drag={'y'}
                        dragSnapToOrigin={true}
                        dragConstraints={{ left: 0, right: 0}}
                        onPanEnd={(e, panInfo) => {
                            if(panInfo.offset.y > 190 || panInfo.offset.y < -190) {
                                setSelectedId(null);
                            }
                            if(panInfo.offset.x < 10) {
                                currentIndex !== galleryData.length -1 && handleForward()
                            }
                            if(panInfo.offset.x > 10) {
                                currentIndex !== 0 && handleBack();
                            }
                        }}
                        src={galleryData[currentIndex].hdlUrl}/>
                        <div 
                        className="expandedDotContainer">
                            {galleryData.map((item, index) => (
                                <div 
                                onClick={() => setCurrentIndex(index)}
                                key={index} className={index === currentIndex ? 'activeDot' : 'dot'}></div>
                            ))}
                        </div>
                    </motion.div>
            </AnimatePresence>
        }
        </>
    )
}



