import React, {useEffect, useState} from "react";
import './Post.css';

export function Video({data}){

    const [url, setUrl] = useState('');

    useEffect(() => {
       if(data.reddit_video) {
        setUrl(data.reddit_video.fallback_url);
       }
       if(data.oembed) {
        setUrl(data.oembed.provided_url);
       }
    },[]);

    console.log(url);

    return(
        <div className="videoContainer">
            <video 
            className="postVideo"
            src={url} controls>
                Playback error.
            </video>
        </div>
    )
}