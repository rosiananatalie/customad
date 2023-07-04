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
    const videoName = 'trial1';
    const videoPoster = `${SERVER_URL}/images/${videoName}.png`;
    const videoSrc = `${SERVER_URL}/videos/${videoName}.mp4`;
    const presentation = [syntax, voice, gender, tone].join('_');
    const content = [videoLength, informationPreference].filter(x => x).join('_');
    const srcPath = `${SERVER_URL}/audios/${presentation}/${content}`;
    const audioDescriptions = [
        { src: `${srcPath}/4.513569.mp3`, startTime: 4.513569 },
        { src: `${srcPath}/24.540732.mp3`, startTime: 24.540732 },
        { src: `${srcPath}/41.894735.mp3`, startTime: 41.894735 },
        { src: `${srcPath}/56.394445.mp3`, startTime: 56.394445 },
        { src: `${srcPath}/71.mp3`, startTime: 71 },
        { src: `${srcPath}/80.mp3`, startTime: 80 },
        { src: `${srcPath}/92.3.mp3`, startTime: 92.3 },
    ];

    return(
        <VideoPlayerComponent
            videoPoster={videoPoster}
            videoSrc={videoSrc}
            audioDescriptions={audioDescriptions}
            isAudioDescriptionEnabled={isAudioDescriptionEnabled}
            speed={speed}
        />
    )
}

export default VideoPlayerContainer;
