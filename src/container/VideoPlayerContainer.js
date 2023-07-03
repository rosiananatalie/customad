import React from "react";
import VideoPlayerComponent from "../component/VideoPlayerComponent";
import { SERVER_URL } from '../constants';

const VideoPlayerContainer = ({
    isAudioDescriptionEnabled,
    videoLength,
    informationPreference,
    speed,
    tone,
    voice,
    gender,
    syntax
}) => {
    const videoType = "trial" // need to change to be props
    const videoId = 1 // need to change to be props
    const presentation = [syntax, voice, gender, tone].join('_');
    const content = [videoLength, informationPreference].filter(x => x).join('_');
    const srcPath = `${SERVER_URL}/audios/${presentation}/${content}`;

    return(
        <VideoPlayerComponent
            videoType={videoType}
            videoId={videoId}
            isAudioDescriptionEnabled={isAudioDescriptionEnabled}
            srcPath={srcPath}
            speed={speed}
        />
    )
}

export default VideoPlayerContainer;
