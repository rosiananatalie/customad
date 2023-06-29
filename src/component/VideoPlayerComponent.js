import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Player, BigPlayButton, ControlBar, ProgressControl, CurrentTimeDisplay, TimeDivider, DurationDisplay } from 'video-react';
import PlayToggle from 'video-react/lib/components/control-bar/PlayToggle';
// import videos from '../../assets/ed1.mp4';
import { VideoLength } from "./DashboardComponent";

const VIDEO_GAP_END_TIME = [
    10.400,
    32.500,
    46.500,
    62.500,
    75.500,
    85.000,
];

const inlineTrialAD = [
    { src: 'assets/inlineTrialAD/4.513569.mp3', startTime: 4.513569 },
    { src: 'assets/inlineTrialAD/24.540732.mp3', startTime: 24.540732 },
    { src: 'assets/inlineTrialAD/41.894735.mp3', startTime: 41.894735 },
    { src: 'assets/inlineTrialAD/56.394445.mp3', startTime: 56.394445 },
    { src: 'assets/inlineTrialAD/71.mp3', startTime: 71 },
    { src: 'assets/inlineTrialAD/80.mp3', startTime: 80 },
    { src: 'assets/inlineTrialAD/92.3.mp3', startTime: 92.3 },
];

const verboseTrialAD = [
    { src: 'assets/verboseTrialAD/4.513569.mp3', startTime: 4.513569 },
    { src: 'assets/verboseTrialAD/24.540732.mp3', startTime: 24.540732 },
    { src: 'assets/verboseTrialAD/41.894735.mp3', startTime: 41.894735 },
    { src: 'assets/verboseTrialAD/56.394445.mp3', startTime: 56.394445 },
    { src: 'assets/verboseTrialAD/71.mp3', startTime: 71 },
    { src: 'assets/verboseTrialAD/80.mp3', startTime: 80 },
    { src: 'assets/verboseTrialAD/92.3.mp3', startTime: 92.3 },
];

const veryVerboseTrialAD = [
    { src: 'assets/veryVerboseTrialAD/4.513569.mp3', startTime: 4.513569 },
    { src: 'assets/veryVerboseTrialAD/24.540732.mp3', startTime: 24.540732 },
    { src: 'assets/veryVerboseTrialAD/41.894735.mp3', startTime: 41.894735 },
    { src: 'assets/veryVerboseTrialAD/56.394445.mp3', startTime: 56.394445 },
    { src: 'assets/veryVerboseTrialAD/71.mp3', startTime: 71 },
    { src: 'assets/veryVerboseTrialAD/80.mp3', startTime: 80 },
    { src: 'assets/veryVerboseTrialAD/92.3.mp3', startTime: 92.3 },
];

function VideoPlayerComponent({
    videoId,
    videoType,
    videoLength,
    speed,
}) {
    const videoRef = useRef();

    const audioRef = useRef(new Audio());
    audioRef.current.addEventListener('ended', () => {
        if (!videoRef.current.getState().player.ended) {
            videoRef.current.play();
        }
    });

    useEffect(()=> {
        if (videoRef.current.video) {
            videoRef.current.video.playbackRate = speed;
        }
        audioRef.current.playbackRate = speed
    }, [speed]);

    const [audioDescriptions, setAudioDescriptions] = useState(inlineTrialAD);
    const [audioDescription, setAudioDescription] = useState();
    const [audioDescriptionIndex, setAudioDescriptionIndex] = useState();

    useEffect(() => {
        switch (videoLength) {
            default:
            case VideoLength.Succinct:
                setAudioDescriptions(inlineTrialAD);
                if (audioDescriptionIndex || audioDescriptionIndex === 0) {
                    setAudioDescription(inlineTrialAD[audioDescriptionIndex]);
                }
                break;
            case VideoLength.Verbose:
                setAudioDescriptions(verboseTrialAD);
                if (audioDescriptionIndex || audioDescriptionIndex === 0) {
                    setAudioDescription(verboseTrialAD[audioDescriptionIndex]);
                }
                break;
            case VideoLength.VeryVerbose:
                setAudioDescriptions(veryVerboseTrialAD);
                if (audioDescriptionIndex || audioDescriptionIndex === 0) {
                    setAudioDescription(veryVerboseTrialAD[audioDescriptionIndex]);
                }
                break;
        }
    }, [videoLength, audioDescriptionIndex]);

    useEffect(() => {
        if (audioDescription) {
            audioRef.current.src = audioDescription.src;
            audioRef.current.playbackRate = speed;
            audioRef.current.play();
            videoRef.current.seek(audioDescription.startTime);
        }
    }, [audioDescription, videoRef]);

    useEffect(()=> {
        if (videoRef.current.video) {
            videoRef.current.video.playbackRate = speed;
        }
    }, [speed]);

    const handleStateChange = useCallback((state, prevState) => {
        const currentAD = audioDescriptions.findLast(ad => ad.startTime <= state.currentTime);
        const currentADIndex = audioDescriptions.indexOf(currentAD);
        const videoGapEndTime = VIDEO_GAP_END_TIME.findLast(time => time <= state.currentTime);
        setAudioDescription(currentAD);
        setAudioDescriptionIndex(currentADIndex)

        if (state.seeking) {
            if (state.currentTime > currentAD.startTime) {
                audioRef.current.currentTime = 0;
                videoRef.current.seek(currentAD.startTime);
            } else if (state.currentTime < videoGapEndTime) {
                audioRef.current.pause();
            }
        }
        if (!audioRef.current.ended) {
            if (state.currentTime < Math.floor(videoGapEndTime + 1) && audioRef.current.currentTime > 0) {
                videoRef.current.pause();
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
                    audioRef.current.play();
                }
                prevHandlePlay();
            };
            const prevPauseHandler = videoRef.current.video.handlePause;
            videoRef.current.video.handlePause = () => {
                const videoCurrentTime = videoRef.current.getState().player.currentTime;
                const videoGapEndTime = VIDEO_GAP_END_TIME.findLast(time => time <= videoCurrentTime);
                if (!(videoCurrentTime < Math.floor(videoGapEndTime + 1) && audioRef.current.currentTime > 0)) {
                    audioRef.current.pause();
                }
                prevPauseHandler();
            };
            unsubscribe.current = videoRef.current.subscribeToStateChange(handleStateChange);
        }
    }, [videoRef, handleStateChange]);

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
