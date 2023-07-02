import React from "react";
import VideoPlayerComponent from "../component/VideoPlayerComponent";

const VideoPlayerContainer = ({
    videoLength,
    informationPreference,
    speed,
    voice,
    gender,
    syntax
}) => {
    const videoType = "trial" // need to change to be props
    const videoId = 1 // need to change to be props
    const presentation = [syntax, voice, gender].join('_');
    const content = [videoLength, informationPreference].filter(x => x).join('_');
    const srcPath = `assets/audios/${presentation}/${content}`;
    console.log(srcPath);

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
