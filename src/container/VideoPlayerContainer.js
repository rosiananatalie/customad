import React, {useState, useEffect, useRef} from "react";
import VideoPlayerComponent from "../component/VideoPlayerComponent"

const VideoPlayerContainer = (props) => {
    
    const videoType = "ed" // need to change to be props
    const videoId = 1 // need to change to be props

    return(
        <div>
            <VideoPlayerComponent  
                videoType = {videoType}
                videoId = {videoId}
            />
        </div>
    )
}

export default VideoPlayerContainer