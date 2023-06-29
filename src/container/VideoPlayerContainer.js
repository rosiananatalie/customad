import React from "react";
import VideoPlayerComponent from "../component/VideoPlayerComponent";

const VideoPlayerContainer = ({
    // videoLength,
    // informationPreference,
    content,
    speed,
    voice,
    gender,
    syntax
}) => {
    const videoType = "trial" // need to change to be props
    const videoId = 1 // need to change to be props
    const srcPath = `assets/audios/${syntax}_${voice}_${gender}/${content}`;

    return(
        <VideoPlayerComponent  
            videoType={videoType}
            videoId={videoId}
            srcPath={srcPath}
            speed={speed}
        />
    )
}

export default VideoPlayerContainer;
