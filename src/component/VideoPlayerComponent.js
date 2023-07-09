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

            if (!audioRef.current.ended) {
                if (state.currentTime < Math.floor(gapEndTime + 1) && audioRef.current.currentTime > 0) {
                    videoRef.current.pause();
                }
            }
        }
    }, [audioDescriptions, videoGapEndTimes]);

    const unsubscribe = useRef(null);
    useEffect(() => {
        if (videoRef.current) {
            if (unsubscribe.current) {
                unsubscribe.current();
            }
            const videoElement = videoRef.current.video.video;
            videoElement.addEventListener('play', (e) => {
                const player = videoRef.current.getState().player;
                // TODO: play by code will log too. run multiple time.
                log(`Play video at ${player.currentTime}`);
                if (!audioRef.current.ended) {
                    playAudio();
                }
            });
            videoElement.addEventListener('pause', (e) => {
                const player = videoRef.current.getState().player;
                const videoCurrentTime = player.currentTime;
                // TODO: pause by code will log too. run multiple time.
                log(`Pause video at ${videoCurrentTime}`);
                const gapEndTime = videoGapEndTimes.findLast(time => time <= videoCurrentTime);
                if (
                    !player.ended
                    && audioRef.current.src !== ""
                    && !(videoCurrentTime < Math.floor(gapEndTime + 1) && audioRef.current.currentTime > 0) 
                ) {
                    audioRef.current.pause();
                }
            });
            unsubscribe.current = videoRef.current.subscribeToStateChange(handleStateChange);
        }
    }, [handleStateChange, playAudio]);

    // https://github.com/video-react/video-react/blob/master/src/components/Shortcut.js
    const handleKeyPress = useCallback((event) => {
        const togglePlay = () => {
            const player = videoRef.current.getState().player;
            if (player.paused) {
                videoRef.current.play({
                    action: 'play',
                    source: 'shortcut'
                });
            } else {
                videoRef.current.pause({
                    action: 'pause',
                    source: 'shortcut'
                });
            }
            if (audioRef.current.src) {
                if (audioRef.current.paused) {
                    audioRef.current.play();
                } else {
                    audioRef.current.pause();
                }
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
                    if (player.hasStarted) {
                        videoRef.current.replay(5, {
                            action: 'replay-5',
                            source: 'shortcut'
                        });
                    }
                    break;
                }
                case 39: {
                    log('Arrow Right is pressed.');
                    event.preventDefault(); // prevent scroll down
                    const player = videoRef.current.getState().player;
                    if (player.hasStarted) {
                        videoRef.current.forward(5, {
                            action: 'forward-5',
                            source: 'shortcut'
                        });
                    }
                    break;
                }
                case 48: {
                    log('0 is pressed.');
                    const player = videoRef.current.getState().player;
                    if (player.hasStarted) {
                        videoRef.current.seek(0);
                    }
                    break;
                }
                case 74: {
                    log('j is pressed.');
                    const player = videoRef.current.getState().player;
                    if (player.hasStarted) {
                        videoRef.current.replay(10, {
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
                    if (player.hasStarted) {
                        videoRef.current.forward(10, {
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
        { keyCode: 16, handle: () => {} },  // Disable Shift (Increase/Decrease speed)
        { keyCode: 32, handle: () => {} },  // Disable Spacebar (Toggle play/pause the video)
        { keyCode: 36, handle: () => {} },  // Disable Home (Restart video)
        { keyCode: 37, handle: () => {} },  // Disable Left arrow (Go back 5 seconds)
        { keyCode: 39, handle: () => {} },  // Disable Right arrow (Go forward 5 seconds)
        { keyCode: 74, handle: () => {} },  // Disable j (Go back 10 seconds)
        { keyCode: 75, handle: () => {} },  // Disable k (Toggle play/pause the video)
        { keyCode: 76, handle: () => {} },  // Disable l (Go forward 10 seconds)
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
