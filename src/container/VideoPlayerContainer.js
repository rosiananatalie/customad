import React, { useEffect, useState } from 'react';
import VideoPlayerComponent from '../component/VideoPlayerComponent';
import { SERVER_URL } from '../Constants';

const VideoPlayerContainer = ({
    videoName,
    videoGapEndTimes,
    isAudioDescriptionEnabled,
    videoLength,
    informationPreference,
    speed,
    tone,
    voice,
    gender,
    syntax
}) => {
    const [audioDescriptions, setAudioDescriptions] = useState([]);

    const videoPoster = `${SERVER_URL}/images/${videoName}.png`;
    const videoSrc = `${SERVER_URL}/videos/${videoName}.mp4`;
    const params = new URLSearchParams({ videoLength, informationPreference, syntax, voice, gender, tone });
    const url = SERVER_URL + '/videos/' + videoName + '/ad?' + params.toString();

    useEffect(() => {
        async function getAudioDescriptions() {
            try {
                const token = sessionStorage.getItem('token');
                const response = await fetch(url, {
                    method : 'GET',
                    headers: {
                        Authorization: 'Bearer ' + token,
                        'Content-type' : 'application/json'
                    }
                });
                const parseRes = await response.json();
                setAudioDescriptions(parseRes);
            } catch (error) {
                console.error('Get audio description failed:', error.message);        
            }
        }
        getAudioDescriptions();
    }, [url]);

    return(
        <VideoPlayerComponent
            videoPoster={videoPoster}
            videoSrc={videoSrc}
            videoGapEndTimes={videoGapEndTimes}
            audioDescriptions={audioDescriptions}
            isAudioDescriptionEnabled={isAudioDescriptionEnabled}
            speed={speed}
        />
    )
}

export default VideoPlayerContainer;
