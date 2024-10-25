import React, { useEffect, useState, useRef } from "react";
import HVideo from "../assets/img/HVideo.webm";
import fullscreen from "../assets/img/fullscreen.png";
import videoStyles from "../scss/components/video.module.scss";
import arrowRight from "../assets/img/arrow Right.png";
import muteIcon from "../assets/img/VolumeOff.webp";
import unmuteIcon from "../assets/img/volumeOn.webp";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoaded } from "../Redux/introSlice";

const VideoPlayer = () => {
  const { isLoaded } = useSelector((state) => state.intro);
  const [isMuted, setIsMuted] = useState(!isLoaded && true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isGifPlaying, setIsGifPlaying] = useState(!isLoaded && true);
  const videoRef = useRef(null);
  const progressContainerRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const video = videoRef.current;
    const progressBar = document.getElementById("progress-bar");

    if (videoRef.current) {
      videoRef.current.play();
    }

    const updateProgressBar = () => {
      const percentage = (video.currentTime / video.duration) * 100;
      progressBar.style.width = `${percentage}%`;
    };

    video.addEventListener("timeupdate", updateProgressBar);

    return () => {
      video.removeEventListener("timeupdate", updateProgressBar);
    };
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (
        !document.fullscreenElement &&
        !document.webkitFullscreenElement &&
        !document.mozFullScreenElement &&
        !document.msFullscreenElement
      ) {
        setIsFullscreen(false);
        const video = videoRef.current;
        if (video.play()) {
          setIsGifPlaying(true);
        }
        setIsMuted(video.muted);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (isGifPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsGifPlaying(!isGifPlaying);
  };

  const showFullVideo = () => {
    setIsFullscreen(true);
    const video = videoRef.current;
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
      // Firefox
      video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
      // Chrome, Safari and Opera
      video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
      // IE/Edge
      video.msRequestFullscreen();
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleProgressClick = (event) => {
    const progressContainer = progressContainerRef.current;
    const rect = progressContainer.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const percentage = offsetX / rect.width;
    const video = videoRef.current;
    video.currentTime = percentage * video.duration;
  };

  const videoAttributes = isFullscreen
    ? {
        controls: true,
        controlsList: "nofullscreen nodownload noremoteplayback noplaybackrate",
      }
    : {};

  return (
    <div className={videoStyles.headerVideo}>
      <div
        className={
          !isGifPlaying && !isFullscreen
            ? videoStyles.playButton
            : `${videoStyles.playButton} ${videoStyles.hidden}`
        }
        onClick={togglePlay}
      >
        <span className={videoStyles.buttonNext}>
          <img loading="lazy" draggable="false" src={arrowRight} />
        </span>
      </div>
      <video
        id="video"
        muted
        loop
        className={`${videoStyles.Video} ${
          !isGifPlaying && !isFullscreen && videoStyles.paused
        } ${!isFullscreen && videoStyles.notFullScreened}`}
        ref={videoRef}
        onClick={togglePlay}
        playsInline
        {...videoAttributes}
      >
        <source src={HVideo} type="video/webm" />
        Your browser does not support the video tag.
      </video>
      <div
        className={`${videoStyles.video_controls} ${
          isFullscreen && videoStyles.hidden
        }`}
      >
        <div className={videoStyles.video_header}>
          <div className={videoStyles.video_title}>
            {/* Watch the showreel */}
            <div className={videoStyles.video_fullscreen}>
              <img
                loading="lazy"
                draggable="false"
                src={fullscreen}
                alt="fullscreen"
                width={20}
                height={20}
                onClick={showFullVideo}
              />
            </div>
            <div className={videoStyles.mute_button}>
              <img
                loading="lazy"
                src={isMuted ? muteIcon : unmuteIcon}
                alt="mute/unmute"
                width={20}
                height={20}
                onClick={toggleMute}
              />
            </div>
          </div>
        </div>
        <div
          className={videoStyles.progress_container}
          ref={progressContainerRef}
          onClick={handleProgressClick}
        >
          <div className={videoStyles.progress_bar} id="progress-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
