import React, { useRef } from "react";
import load from "../scss/components/loader.module.scss";
import intro from "../assets/img/LiquidIntro.gif";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoaded } from "../Redux/introSlice";
import HVideo from "../assets/img/HVideo.MP4";

const Intro = () => {
  const dispatch = useDispatch();
  const videoRef = useRef(null);

  const [visible, setVisible] = React.useState(true);

  const { isLoaded } = useSelector((state) => state.intro);

  const handleHideIntro = () => {
    setVisible(false);
    setTimeout(() => {
      dispatch(setIsLoaded(true));
    }, 800);
  };

  React.useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play();
    }
  }, []);

  return (
    <>
      {!isLoaded && (
        <div className={load.intro} onClick={handleHideIntro}>
          <video
            id="video"
            muted
            loop
            className={visible ? `` : `${load.swirl_out}`}
            ref={videoRef}
          >
            <source src={HVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </>
  );
};

export default Intro;
