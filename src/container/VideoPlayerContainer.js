import React from "react";
import VideoPlayerComponent from "../component/VideoPlayerComponent";

const VideoPlayerContainer = (props) => {
    
    // const videoType = "ed"
    // const videoId = 1

    return(
        <div>
            <VideoPlayerComponent  
                videoType = "ed"
                videoId = "1"
            />
        </div>
    )
}

export default VideoPlayerContainer