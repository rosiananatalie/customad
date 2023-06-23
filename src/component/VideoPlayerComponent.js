import React from 'react';
import { Player, BigPlayButton, ControlBar, ProgressControl, CurrentTimeDisplay, TimeDivider, DurationDisplay } from 'video-react';
import PlayToggle from 'video-react/lib/components/control-bar/PlayToggle';
// import videos from '../../assets/ed1.mp4'


function VideoPlayerComponent(props) {
    
    const videoId = props.videoId
    const videoType = props.videoType
    const videoRef = props.videoRef
    
    return (
        <div>
            <Player
                ref={props.videoRef}
                playsInline
                poster = {"../../assets/ed1.png"}
                controls
            >
                    {/* <source src={require("../assets/" + videoId + ".mp4")} type="video/mp4"/> */}
                    <source src={"assets/" + videoType + videoId + ".mp4"} type="video/mp4"/>
                    <BigPlayButton position="center" />


                    <ControlBar autoHide={false} disableDefaultControls>
                        <PlayToggle/>
                        <CurrentTimeDisplay />
                        <TimeDivider />
                        <DurationDisplay />
                        <ProgressControl/>
                    </ControlBar>
            </Player>

        </div>
          
    );
}

export default VideoPlayerComponent
