import React, { useRef } from "react";
import load from "../scss/components/loader.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoaded } from "../Redux/introSlice";
import HVideo from "../assets/img/liquedType.gif";

const Intro = () => {
  const dispatch = useDispatch();

  const [visible, setVisible] = React.useState(true);

  const { isLoaded } = useSelector((state) => state.intro);

  React.useEffect(() => {
    setTimeout(() => {
      setVisible(false);

      setTimeout(() => {
        dispatch(setIsLoaded(true));
      }, 800);
    }, 5000);
  }, []);

  return (
    <>
      {!isLoaded && (
        <div className={load.intro}>
          <img
            id="video"
            src={HVideo}
            className={visible ? `` : `${load.swirl_out}`}
            loading="eager"
          />
        </div>
      )}
    </>
  );
};

export default Intro;
