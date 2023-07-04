import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Player, BigPlayButton, ControlBar, ProgressControl, CurrentTimeDisplay, TimeDivider, DurationDisplay } from 'video-react';
import PlayToggle from 'video-react/lib/components/control-bar/PlayToggle';
import { SERVER_URL } from '../constants';

const VIDEO_GAP_END_TIME = [
    10.400,
    32.500,
    46.500,
    62.500,
    75.500,
    85.000,
];

function VideoPlayerComponent({
    videoPoster,
    videoSrc,
    audioDescriptions,
    isAudioDescriptionEnabled,
    speed,
}) {
    const [audioDescription, setAudioDescription] = useState();

    const videoRef = useRef();

    const audioRef = useRef(new Audio());
    audioRef.current.playbackRate = speed;
    audioRef.current.addEventListener('ended', () => {
        if (!videoRef.current.getState().player.ended) {
            videoRef.current.play();
        }
    });

    const playAudio = useCallback(() => {
        if (isAudioDescriptionEnabled && audioRef.current.src) {
            audioRef.current.play();
        }
    }, [isAudioDescriptionEnabled]);

    // Set audio descriptions
    useEffect(() => {
        if (audioDescriptions) {
            const videoCurrentTime = videoRef.current.getState().player.currentTime;
            const audioDescription = audioDescriptions.findLast(ad => ad.startTime <= videoCurrentTime);
            setAudioDescription(audioDescription);
        }
    }, [audioDescriptions]);

    // Set video and audio playback rate
    useEffect(()=> {
        if (videoRef.current.video) {
            videoRef.current.video.playbackRate = speed;
        }
        audioRef.current.playbackRate = speed
    }, [speed]);

    // Pause audio if audio description is disabled
    useEffect(()=> {
        if (!isAudioDescriptionEnabled) {
            audioRef.current.pause();
        }
    }, [isAudioDescriptionEnabled]);

    // Set audio description
    useEffect(() => {
        if (audioDescription) {
            audioRef.current.src = SERVER_URL + audioDescription.src;
            playAudio();
            const videoState = videoRef.current.getState().player;
            // Make time comparison less sensitive to prevent unnecessary seeking
            if (Math.floor(videoState.currentTime) > Math.ceil(audioDescription.startTime)) {
                videoRef.current.seek(audioDescription.startTime);
            }
            videoRef.current.play();
        } else {
            audioRef.current.removeAttribute('src');
            audioRef.current.pause();
        }
    }, [audioDescription, playAudio]);

    const handleStateChange = useCallback((state, prevState) => {
        if (audioDescriptions) {
            const currentAD = audioDescriptions.findLast(ad => ad.startTime <= state.currentTime);
            const videoGapEndTime = VIDEO_GAP_END_TIME.findLast(time => time <= state.currentTime);
            setAudioDescription(currentAD);

            if (state.seeking) {
                if (currentAD) {
                    if (state.currentTime > currentAD.startTime) {
                        audioRef.current.currentTime = 0;
                        videoRef.current.seek(currentAD.startTime);
                        videoRef.current.play();
                    } else if (state.currentTime < videoGapEndTime) {
                        audioRef.current.pause();
                    }
                } else {
                    audioRef.current.pause();
                }
            }
            if (!audioRef.current.ended) {
                if (state.currentTime < Math.floor(videoGapEndTime + 1) && audioRef.current.currentTime > 0) {
                    videoRef.current.pause();
                }
            }
        }
    }, [audioDescriptions]);

    const unsubscribe = useRef(null);
    useEffect(() => {
        if (videoRef.current) {
            if (unsubscribe.current) {
                unsubscribe.current();
            }
            const prevHandlePlay = videoRef.current.video.handlePlay;
            videoRef.current.video.handlePlay = () => {
                if (videoRef.current.getState().player.paused && !audioRef.current.ended) {
                    playAudio();
                }
                prevHandlePlay();
            };
            const prevPauseHandler = videoRef.current.video.handlePause;
            videoRef.current.video.handlePause = () => {
                const videoState = videoRef.current.getState().player;
                const videoCurrentTime = videoState.currentTime;
                const videoGapEndTime = VIDEO_GAP_END_TIME.findLast(time => time <= videoCurrentTime);
                if (
                    audioRef.current.src !== ""
                    && !(videoCurrentTime < Math.floor(videoGapEndTime + 1) && audioRef.current.currentTime > 0)
                    && !videoState.ended
                ) {
                    audioRef.current.pause();
                }
                prevPauseHandler();
            };
            unsubscribe.current = videoRef.current.subscribeToStateChange(handleStateChange);
        }
    }, [handleStateChange, playAudio]);

    return (
        <Player
            ref={videoRef}
            playsInline
            poster={videoPoster}
            controls
        >
            <source src={videoSrc} type="video/mp4" />
            <BigPlayButton position="center" />
            <ControlBar autoHide={false} disableDefaultControls>
                <PlayToggle />
                <CurrentTimeDisplay />
                <TimeDivider />
                <DurationDisplay />
                <ProgressControl />
            </ControlBar>
        </Player>
    );
}

export default VideoPlayerComponent;
