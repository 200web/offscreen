import React, { useRef } from "react";
import load from "../scss/components/loader.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoaded } from "../Redux/introSlice";
import HVideo from "../assets/img/liquedType.webm";

const Intro = () => {
  const dispatch = useDispatch();

  const [visible, setVisible] = React.useState(true);

  const { isLoaded } = useSelector((state) => state.intro);

  return (
    <>
      {!isLoaded && (
        <div className={load.intro}>
          <video
            className={visible ? `` : `${load.swirl_out}`}
            onEnded={() => {
              setVisible(false);

              setTimeout(() => {
                dispatch(setIsLoaded(true));
              }, 800);
            }}
            autoPlay
            muted
            playsInline
            preload="auto"
          >
            <source src={HVideo} type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </>
  );
};

export default Intro;
