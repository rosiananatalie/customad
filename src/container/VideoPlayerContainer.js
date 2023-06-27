import React, { useEffect, useRef } from "react";
import VideoPlayerComponent from "../component/VideoPlayerComponent";

const VideoPlayerContainer = ({
    speed,
}) => {
    const videoType = "trial" // need to change to be props
    const videoId = 1 // need to change to be props
    const videoRef = useRef(null);

    useEffect(()=> {
        const videoElement = videoRef.current.video;
        if (videoElement) {
          videoElement.playbackRate = speed;
        }
    }, [speed]);

    return(
        <VideoPlayerComponent  
            videoType={videoType}
            videoId={videoId}
            videoRef={videoRef}
            speed={speed}
        />
    )
}

export default VideoPlayerContainer;
