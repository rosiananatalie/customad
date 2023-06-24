import React, { useEffect, useRef } from 'react';
import VideoPlayerComponent from '../component/VideoPlayerComponent';

const VideoPlayerContainer = (props) => {
  const videoType = 'trial'; // Replace with your video type
  const videoId = 1; // Replace with your video ID
  const videoRef = useRef(null);

  const mp3Files = [
    {
      src: 'assets/inlineTrialAD/4.513569.mp3',
      startTime: 4.513569, // Start time in seconds
      endTime: 20, // End time in seconds
    },
    // Add more MP3 files with their timings
  ];

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'ArrowUp') {
        event.preventDefault();
        increasePlaybackSpeed();
      } else if (event.code === 'ArrowDown') {
        event.preventDefault();
        decreasePlaybackSpeed();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const increasePlaybackSpeed = () => {
    const videoElement = videoRef.current.video.video;
    if (videoElement) {
      videoElement.playbackRate += 0.25; // Increase the playback rate by 0.25
    }
  };

  const decreasePlaybackSpeed = () => {
    const videoElement = videoRef.current.video.video;
    if (videoElement) {
      videoElement.playbackRate -= 0.25; // Decrease the playback rate by 0.25
    }
  };

  return (
    <div>
      <VideoPlayerComponent
        videoType={videoType}
        videoId={videoId}
        videoRef={videoRef}
        mp3Files={mp3Files}
      />
    </div>
  );
};

export default VideoPlayerContainer;
