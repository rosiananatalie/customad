import React, {useState, useEffect, useRef} from "react";
import VideoPlayerComponent from "../component/VideoPlayerComponent"

const VideoPlayerContainer = (props) => {
    
    const videoType = "ed" // need to change to be props
    const videoId = 1 // need to change to be props
    const videoRef = useRef(null);

    useEffect(()=> {
        const handleKeyPress = (event) =>{
            if (event.code === 'ArrowUp') {
                event.preventDefault();
                increasePlaybackSpeed();
            } else if (event.code === 'ArrowDown') {
                event.preventDefault();
                decreasePlaybackSpeed();
            }
        }

        document.addEventListener('keydown',handleKeyPress);
        return () => {
            document.removeEventListener('keydown',handleKeyPress)
        }
    }, []);

    const increasePlaybackSpeed = () => {
        const videoElement = videoRef.current.video;
        if (videoElement) {
          videoElement.playbackRate += 0.25; // Increase the playback rate by 0.1
        }
    };

    const decreasePlaybackSpeed = () => {
        const videoElement = videoRef.current.video;
        if (videoElement) {
          videoElement.playbackRate -= 0.25; // Decrease the playback rate by 0.1
        }
      };

    return(
        <div>
            <VideoPlayerComponent  
                videoType = {videoType}
                videoId = {videoId}
                videoRef = {videoRef}
            />
        </div>
    )
}

export default VideoPlayerContainer