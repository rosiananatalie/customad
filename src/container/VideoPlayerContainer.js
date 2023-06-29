import React, { useEffect, useRef } from "react";
import VideoPlayerComponent from "../component/VideoPlayerComponent";

const VideoPlayerContainer = ({
    speed,
}) => {
    const videoType = "trial" // need to change to be props
    const videoId = 1 // need to change to be props

    return(
        <VideoPlayerComponent  
            videoType={videoType}
            videoId={videoId}
            speed={speed}
        />
    )
}

export default VideoPlayerContainer;
