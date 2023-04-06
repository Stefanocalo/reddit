import React from "react";
import './Post.css';
import { motion } from "framer-motion";

export function Post({post}) {
    return(
        <motion.div
        className="postWrapper"
        initial={{y: 80}}
        whileInView={{y: 0}}
        >
            <div className="infoSection">
                
            </div>

        </motion.div>
    )
}