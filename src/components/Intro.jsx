import React from "react";
import load from "../scss/components/loader.module.scss";
import intro from "../assets/img/LiquidIntro.gif";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoaded } from "../Redux/introSlice";

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
    }, 3000);
  }, []);

  return (
    <>
      {!isLoaded && (
        <div className={load.intro}>
          <img
            draggable="false"
            src={intro}
            alt="logo"
            className={visible ? `` : `${load.swirl_out}`}
          />
        </div>
      )}
    </>
  );
};

export default Intro;
