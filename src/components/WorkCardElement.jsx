import React, { useEffect, useState } from "react";
import appStyles from "../scss/app.module.scss";
import timingGif from "../assets/img/timing.gif";
import timingStatic from "../assets/img/timingStatic.webp";
import workHeadGif from "../assets/img/workHead.gif";
import workHeadStatic from "../assets/img/head.png";
import moreArrow from "../assets/img/moreArrow.png";
import { Link } from "react-router-dom";
import axios from "axios";

const WorkCardElement = () => {
  const [images, setImages] = useState([
    { gif: timingGif, static: timingStatic },
    { gif: workHeadGif, static: workHeadStatic },
    { gif: workHeadGif, static: workHeadStatic },
    { gif: timingGif, static: timingStatic },
    { gif: timingGif, static: timingStatic },
  ]);
  const [isAnimating, setIsAnimating] = useState(images.map(() => false));
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
  const [cardsData, setCardsData] = useState([]);
  const [isHovered, setIsHovered] = useState(null);
  const animationTimeouts = React.useRef();
  const animationTimeouts2 = React.useRef();

  useEffect(() => {
    async function fetchCards() {
      try {
        const { data } = await axios.get(
          `https://66d60cecf5859a7042683b4d.mockapi.io/Cards`
        );
        setCardsData(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchCards();
  }, []);

  const animate = (indices, state) => {
    setIsAnimating((prevAnimating) => {
      const newAnimating = [...prevAnimating];
      indices.forEach((index) => {
        newAnimating[index] = state ? !newAnimating[index] : false;
      });
      return newAnimating;
    });
  };

  const handleMouseEnter = (id) => {
    setIsHovered(id);
  };

  const handleMouseLeave = () => {
    setIsHovered(null);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isHovered !== null) {
      clearInterval(animationTimeouts.current);
      clearTimeout(animationTimeouts2.current);
      animate([0, 1, 2, 3, 4], false);
      setIsAnimating((prevAnimating) =>
        prevAnimating.map((_, index) => index === isHovered)
      );
    } else {
      setIsAnimating((prevAnimating) =>
        prevAnimating.map((_, index) => index === isHovered)
      );
      animationTimeouts.current = setInterval(() => {
        animate([0, 3, 4], true);
        animationTimeouts2.current = setTimeout(() => {
          animate([1, 2], true);
        }, 3000);
      }, 3000);
    }
  }, [isHovered, isMobile]);

  return (
    <div className={appStyles.workBlock} id="our works">
      {images.map((photo, id) => (
        <Link to={`/project/${id}`} key={id}>
          <div
            className={appStyles.workCard}
            onMouseEnter={() => handleMouseEnter(id)}
            onMouseLeave={handleMouseLeave}
            style={{
              backgroundImage: `url(${photo.static})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <img
              draggable="false"
              src={photo.gif}
              alt={`project-${id}`}
              className={`${
                isMobile
                  ? appStyles.fadeIn
                  : isAnimating[id]
                  ? appStyles.fadeIn
                  : appStyles.fadeOut
              }`}
            />
            {cardsData[id] && (
              <div className={appStyles.textContent}>
                <div>
                  <h4>{cardsData[id].label}</h4>
                </div>
                <div>
                  <span className={appStyles.description}>
                    {cardsData[id].text}
                  </span>
                </div>
              </div>
            )}
          </div>
        </Link>
      ))}
      <div className={appStyles.workCard}>
        <Link to={`/portfolio`}>
          <img draggable="false" src={workHeadGif} alt="logo" />
          <div className={appStyles.textContent}>
            <div>
              <label>Go to the portfolio</label>
            </div>
          </div>
          <div className={appStyles.button}>
            <img draggable="false" src={moreArrow} alt="arrow" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default WorkCardElement;
