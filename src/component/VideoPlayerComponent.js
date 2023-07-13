import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Player, BigPlayButton, ControlBar, ProgressControl, CurrentTimeDisplay, TimeDivider, DurationDisplay, Shortcut } from 'video-react';
import PlayToggle from 'video-react/lib/components/control-bar/PlayToggle';
import { SERVER_URL } from '../Constants';
import { log } from '../Utils';

function VideoPlayerComponent({
    videoName,
    videoGapEndTimes,
    audioDescriptions,
    isAudioDescriptionEnabled,
    speed,
}) {
    const [audioDescription, setAudioDescription] = useState();
    const [videoGapEndTime, setVideoGapEndTime] = useState();
    const [seekAt, setSeekAt] = useState();

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

    // Pause audio if audio description is disabled
    useEffect(()=> {
        if (!isAudioDescriptionEnabled) {
            audioRef.current.pause();
        }
    }, [isAudioDescriptionEnabled]);

    // Set video and audio playback rate
    useEffect(()=> {
        if (videoRef.current.video) {
            videoRef.current.video.playbackRate = speed;
        }
        audioRef.current.playbackRate = speed
    }, [speed]);

    // Set audio description
    useEffect(() => {
        if (audioDescription) {
            audioRef.current.src = SERVER_URL + audioDescription.src;
            log(`Current audio description is ${audioDescription.src}`);
            const player = videoRef.current.getState().player;
            // Make time comparison less sensitive to prevent unnecessary seeking
            if (Math.floor(player.currentTime) > Math.ceil(audioDescription.startTime)) {
                videoRef.current.seek(audioDescription.startTime);
            }
            if (!player.paused) {
                videoRef.current.play();
                playAudio();
            }
        } else {
            audioRef.current.removeAttribute('src');
            audioRef.current.pause();
        }
    }, [audioDescription, playAudio]);

    useEffect(() => {
        if (seekAt) {
            // Possible to log twice; first is seek by user, and second is seek by system to the start of ad
            log(`Seeking at ${seekAt}`);
            if (audioDescription) {
                if (seekAt > audioDescription.startTime) {
                    audioRef.current.currentTime = 0;
                    videoRef.current.seek(audioDescription.startTime);

                    const player = videoRef.current.getState().player;
                    if (!player.paused) {
                        videoRef.current.play();
                        playAudio();
                    }
                } else if (seekAt < videoGapEndTime) {
                    audioRef.current.pause();
                }
            } else {
                audioRef.current.pause();
            }
        }
    }, [seekAt, playAudio]);

    const handleStateChange = useCallback((state, prevState) => {
        if (audioDescriptions) {
            const currentAD = audioDescriptions.findLast(ad => ad.startTime <= state.currentTime);
            const gapEndTime = videoGapEndTimes.findLast(time => time <= state.currentTime);
            setAudioDescription(currentAD);
            setVideoGapEndTime(gapEndTime);
            setSeekAt(state.seeking ? state.currentTime : null);

            if (
                !audioRef.current.ended
                && audioRef.current.currentTime > 0
                && Math.floor(state.currentTime) <= Math.ceil(gapEndTime)
            ) {
                videoRef.current.pause();
            }
        }
    }, [audioDescriptions, videoGapEndTimes]);

    const handlePlay = useCallback(() => {
        const player = videoRef.current.getState().player;
        // TODO: play by code will log too. run multiple time.
        log(`Play video at ${player.currentTime}`);
        if (!audioRef.current.ended) {
            playAudio();
        }
    }, [playAudio]);

    const handlePause = useCallback(() => {
        const player = videoRef.current.getState().player;
        const videoCurrentTime = player.currentTime;
        // TODO: pause by code will log too. run multiple time.
        log(`Pause video at ${videoCurrentTime}`);
        if (
            !player.ended
            && audioRef.current.src
            && !(Math.floor(videoCurrentTime) <= Math.ceil(videoGapEndTime) && audioRef.current.currentTime > 0) 
        ) {
            audioRef.current.pause();
        }
    }, [videoGapEndTime]);

    const unsubscribe = useRef(null);
    useEffect(() => {
        if (videoRef.current) {
            if (unsubscribe.current) {
                unsubscribe.current();
            }
            const videoElement = videoRef.current.video.video;
            videoElement.addEventListener('play', handlePlay);
            videoElement.addEventListener('pause', handlePause);
            unsubscribe.current = videoRef.current.subscribeToStateChange(handleStateChange);

            return () => {
                videoElement.removeEventListener('play', handlePlay);
                videoElement.removeEventListener('pause', handlePause);
            };
        }
    }, [handlePlay, handlePause, handleStateChange]);

    // https://github.com/video-react/video-react/blob/master/src/components/Shortcut.js
    const handleKeyPress = useCallback((event) => {
        const togglePlay = () => {
            const player = videoRef.current.getState().player;
            const actions = videoRef.current.actions;
            if (player.paused) {
                actions.play({
                    action: 'play',
                    source: 'shortcut'
                });
            } else {
                actions.pause({
                    action: 'pause',
                    source: 'shortcut'
                });
            }
        };
        if (!event.shiftKey) {
            switch (event.keyCode) {
                case 32: {
                    log('Spacebar is pressed.');
                    event.preventDefault(); // prevent scroll down
                    togglePlay();
                    break;
                }
                case 37: {
                    log('Arrow Left is pressed.');
                    const player = videoRef.current.getState().player;
                    const actions = videoRef.current.actions;
                    if (player.hasStarted) {
                        actions.replay(5, {
                            action: 'replay-5',
                            source: 'shortcut'
                        });
                    }
                    break;
                }
                case 38: {
                    log('Arrow Up is pressed.');
                    if (document.activeElement === videoRef.current.video.video) {
                        const player = videoRef.current.getState().player;
                        const actions = videoRef.current.actions;
                        let volume = player.volume + 0.05;
                        if (volume > 1) {
                          volume = 1;
                        }
                        actions.changeVolume(volume, {
                          action: 'volume-up',
                          source: 'shortcut'
                        });
                    }
                    break;
                }
                case 39: {
                    log('Arrow Right is pressed.');
                    event.preventDefault(); // prevent scroll down
                    const player = videoRef.current.getState().player;
                    const actions = videoRef.current.actions;
                    if (player.hasStarted) {
                        actions.forward(5, {
                            action: 'forward-5',
                            source: 'shortcut'
                        });
                    }
                    break;
                }
                case 40: {
                    log('Arrow Down is pressed.');
                    if (document.activeElement === videoRef.current.video.video) {
                        const player = videoRef.current.getState().player;
                        const actions = videoRef.current.actions;
                        let volume = player.volume - 0.05;
                        if (volume < 0) {
                            volume = 0;
                        }
                        actions.changeVolume(volume, {
                            action: volume > 0 ? 'volume-down' : 'volume-off',
                            source: 'shortcut'
                        });
                    }
                    break;
                }
                case 48: {
                    log('0 is pressed.');
                    const player = videoRef.current.getState().player;
                    const actions = videoRef.current.actions;
                    if (player.hasStarted) {
                        actions.seek(0);
                    }
                    break;
                }
                case 74: {
                    log('j is pressed.');
                    const player = videoRef.current.getState().player;
                    const actions = videoRef.current.actions;
                    if (player.hasStarted) {
                        actions.replay(10, {
                            action: 'replay-10',
                            source: 'shortcut'
                        });
                    }
                    break;
                }
                case 75: {
                    log('k is pressed.');
                    togglePlay();
                    break;
                }
                case 76: {
                    log('l is pressed.');
                    const player = videoRef.current.getState().player;
                    const actions = videoRef.current.actions;
                    if (player.hasStarted) {
                        actions.forward(10, {
                            action: 'forward-10',
                            source: 'shortcut'
                        });
                    }
                    break;
                }
                default:
                    break;
            }
        }
    }, []);

    useEffect(() => {
        // attach the event listener
        document.addEventListener('keydown', handleKeyPress);
    
        // remove the event listener
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);

    // https://video-react.js.org/components/shortcut/
    const playerShortcuts = [
        { keyCode: 16, handle: () => {} }, // Disable Shift (Increase/Decrease speed)
        { keyCode: 32, handle: () => {} }, // Disable Spacebar (Toggle play/pause the video)
        { keyCode: 36, handle: () => {} }, // Disable Home (Restart video)
        { keyCode: 37, handle: () => {} }, // Disable Left arrow (Go back 5 seconds)
        { keyCode: 38, handle: () => {} }, // Disable Up arrow (Increase volume 5%)
        { keyCode: 39, handle: () => {} }, // Disable Right arrow (Go forward 5 seconds)
        { keyCode: 40, handle: () => {} }, // Disable Down arrow (Decrease volume 5%)
        { keyCode: 74, handle: () => {} }, // Disable j (Go back 10 seconds)
        { keyCode: 75, handle: () => {} }, // Disable k (Toggle play/pause the video)
        { keyCode: 76, handle: () => {} }, // Disable l (Go forward 10 seconds)
    ];

    return (
        <Player
            key={videoName}
            ref={videoRef}
            playsInline
            poster={`${SERVER_URL}/images/${videoName}.png`}
            controls
        >
            <source src={`${SERVER_URL}/videos/${videoName}.mp4`} type="video/mp4" />
            <BigPlayButton position="center" />
            <ControlBar autoHide={false} disableDefaultControls>
                <PlayToggle />
                <CurrentTimeDisplay />
                <TimeDivider />
                <DurationDisplay />
                <ProgressControl />
            </ControlBar>
            <Shortcut shortcuts={playerShortcuts} />
        </Player>
    );
}

export default VideoPlayerComponent;
