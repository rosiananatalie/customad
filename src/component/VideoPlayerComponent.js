import React, { useEffect, useRef } from 'react';
import { Player, BigPlayButton, ControlBar, ProgressControl, CurrentTimeDisplay, TimeDivider, DurationDisplay } from 'video-react';
import PlayToggle from 'video-react/lib/components/control-bar/PlayToggle';

function VideoPlayerComponent(props) {
  const { videoId, videoType, videoRef, mp3Files } = props;

  useEffect(() => {
    const videoElement = videoRef.current.video.video;
    const audioElements = mp3Files.map((mp3File) => new Audio(mp3File.src));

    videoElement.addEventListener('timeupdate', handleTimeUpdate);

    function handleTimeUpdate() {
      const currentTime = videoElement.currentTime;

      // Play the corresponding audio file if its start time matches the video time
      audioElements.forEach((audio) => {
        if (currentTime >= audio.startTime && currentTime < audio.endTime && audio.paused) {
          audio.play();
        } else if ((currentTime < audio.startTime || currentTime >= audio.endTime) && !audio.paused) {
          audio.pause();
        }
      });
    }

    return () => {
      videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      audioElements.forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
      });
    };
  }, [videoRef, mp3Files]);

  return (
    <div>
      <Player ref={videoRef} playsInline poster="../../assets/trial1.png" controls>
        <source src={`assets/${videoType}${videoId}.mp4`} type="video/mp4" />
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
