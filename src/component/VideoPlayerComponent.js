import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Player, BigPlayButton, ControlBar, ProgressControl, CurrentTimeDisplay, TimeDivider, DurationDisplay } from 'video-react';
import PlayToggle from 'video-react/lib/components/control-bar/PlayToggle';
// import videos from '../../assets/ed1.mp4';

const VIDEO_AUDIO_START_TIME_AFTER_GAP = [
    10.400,
    32.500,
    46.500,
    62.500,
    75.500,
    85.000,
];

const inlineTrialAD = [
    { audio: new Audio('assets/inlineTrialAD/4.513569.mp3'), startTime: 4.513569 },
    { audio: new Audio('assets/inlineTrialAD/24.540732.mp3'), startTime: 24.540732 },
    { audio: new Audio('assets/inlineTrialAD/41.894735.mp3'), startTime: 41.894735 },
    { audio: new Audio('assets/inlineTrialAD/56.394445.mp3'), startTime: 56.394445 },
    { audio: new Audio('assets/inlineTrialAD/71.mp3'), startTime: 71 },
    { audio: new Audio('assets/inlineTrialAD/80.mp3'), startTime: 80 },
    { audio: new Audio('assets/inlineTrialAD/92.3.mp3'), startTime: 92.3 },
];

const verboseTrialAD = [
    { audio: new Audio('assets/verboseTrialAD/4.513569.mp3'), startTime: 4.513569 },
    { audio: new Audio('assets/verboseTrialAD/24.540732.mp3'), startTime: 24.540732 },
    { audio: new Audio('assets/verboseTrialAD/41.894735.mp3'), startTime: 41.894735 },
    { audio: new Audio('assets/verboseTrialAD/56.394445.mp3'), startTime: 56.394445 },
    { audio: new Audio('assets/verboseTrialAD/71.mp3'), startTime: 71 },
    { audio: new Audio('assets/verboseTrialAD/80.mp3'), startTime: 80 },
    { audio: new Audio('assets/verboseTrialAD/92.3.mp3'), startTime: 92.3 },
];

const veryVerboseTrialAD = [
    { audio: new Audio('assets/veryVerboseTrialAD/4.513569.mp3'), startTime: 4.513569 },
    { audio: new Audio('assets/veryVerboseTrialAD/24.540732.mp3'), startTime: 24.540732 },
    { audio: new Audio('assets/veryVerboseTrialAD/41.894735.mp3'), startTime: 41.894735 },
    { audio: new Audio('assets/veryVerboseTrialAD/56.394445.mp3'), startTime: 56.394445 },
    { audio: new Audio('assets/veryVerboseTrialAD/71.mp3'), startTime: 71 },
    { audio: new Audio('assets/veryVerboseTrialAD/80.mp3'), startTime: 80 },
    { audio: new Audio('assets/veryVerboseTrialAD/92.3.mp3'), startTime: 92.3 },
];

function VideoPlayerComponent({
    videoId,
    videoType,
    speed,
}) {
    const videoRef = useRef(null);
    const [audioDescriptions, setAudioDescriptions] = useState(inlineTrialAD);

    useEffect(()=> {
        if (videoRef.current.video) {
            videoRef.current.video.playbackRate = speed;
        }
    }, [speed]);

    const handleStateChange = useCallback((state, prevState) => {
        const currentAD = audioDescriptions.findLast(ad => ad.startTime <= state.currentTime);
        const afterGapStartTime = VIDEO_AUDIO_START_TIME_AFTER_GAP.findLast(time => state.currentTime >= time && state.currentTime < Math.floor(time + 1));
        if (currentAD) {
            currentAD.audio.playbackRate = speed;
            if (state.seeking) {
                // Pause all audios other than current audio
                audioDescriptions.forEach((ad) => {
                    if (ad !== currentAD) {
                        ad.audio.pause();
                        ad.audio.currentTime = 0;
                    }
                });
                currentAD.audio.currentTime = state.currentTime - currentAD.startTime;
            }
            if (!currentAD.audio.ended) {
                if (afterGapStartTime && currentAD.audio.currentTime > 0) {
                    videoRef.current.pause();
                    document.getElementsByClassName('.video-react-play-control').disabled = true;
                } else {
                    if (state.paused && !state.ended) {
                        currentAD.audio.pause();
                    } else {
                        currentAD.audio.addEventListener('ended', () => {
                            if (!videoRef.current.getState().player.ended) {
                                videoRef.current.play();
                            }
                        });
                        currentAD.audio.play();
                    }
                }
            }
        }
    }, [audioDescriptions, videoRef, speed]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.subscribeToStateChange(handleStateChange);
        }
    }, [handleStateChange, videoRef]);

    return (
        <div>
            <Player
                ref={videoRef}
                playsInline
                poster = {"../../assets/trial1.png"}
                controls
            >
                    {/* <source src={require("../assets/" + videoId + ".mp4")} type="video/mp4"/> */}
                    <source src={"assets/" + videoType + videoId + ".mp4"} type="video/mp4" />
                    <BigPlayButton position="center" />
                    <ControlBar autoHide={false} disableDefaultControls>
                        <PlayToggle />
                        <CurrentTimeDisplay />
                        <TimeDivider />
                        <DurationDisplay />
                        <ProgressControl />
                    </ControlBar>
            </Player>
        </div>
    );
}

export default VideoPlayerComponent;
