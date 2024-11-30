import React, { useEffect, useState } from "react";
import appStyles from "../scss/app.module.scss";
import Liquid from "../assets/img/Liquid Splitting.gif";
import moreArrow from "../assets/img/moreArrow.png";
import { Link } from "react-router-dom";
import axios from "axios";
import MyLoader from "./Loader";

const WorkCardElement = () => {
  const videoRefs = React.useRef([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
  const [isHovered, setIsHovered] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isShort, setIsShort] = React.useState(false);
  const animationTimeouts = React.useRef();
  const animationTimeouts2 = React.useRef();
  const [cardsData, setCardsData] = useState([]);
  const [isAnimating, setIsAnimating] = useState(cardsData?.map(() => false));

  useEffect(() => {
    const targetElement = document.getElementById("Our works");

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const callback = (entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          async function fetchCards() {
            try {
              setIsLoading(true);
              const { data } = await axios.get(
                `https://66e82c2db17821a9d9dbada4.mockapi.io/Cards`
              );
              setCardsData(data);
              setIsLoading(false);
              observer.disconnect();
            } catch (error) {
              console.log(error);
              observer.disconnect();
            }
          }

          fetchCards();
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    if (targetElement) {
      observer.observe(targetElement);
    }

    return () => {
      if (targetElement) {
        observer.unobserve(targetElement);
      }
    };
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
    const video = videoRefs.current[id];
    if (video) {
        video.currentTime = 0; // Перематываем на начало
        video.play(); // Запускаем видео
    }
};

const handleMouseLeave = (id) => {
    setIsHovered(null);
    const video = videoRefs.current[id];
    if (video) {
        video.pause(); // Ставим видео на паузу
    }
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
    if (!isMobile) {
      videoRefs.current.forEach((video) => {
        if (video) {
          video.play();
        }
      });
      if (isHovered !== null) {
        clearInterval(animationTimeouts.current);
        clearTimeout(animationTimeouts2.current);

        animate(
          Array.from({ length: cardsData.length }, (_, index) => index),
          false
        );
        setIsAnimating((prevAnimating) =>
          prevAnimating.map((_, index) => index === isHovered)
        );
      } else {
        setIsAnimating((prevAnimating) =>
          prevAnimating.map((_, index) => index === isHovered)
        );

        animationTimeouts.current = setInterval(() => {
          const firstSetIndices = Array.from(
            { length: Math.ceil(cardsData.length / 2) },
            (_, i) => i * 2
          ).filter((index) => index < cardsData.length);

          const secondSetIndices = Array.from(
            { length: Math.floor(cardsData.length / 2) },
            (_, i) => i * 2 + 1
          ).filter((index) => index < cardsData.length);

          animate(firstSetIndices, true);
          animationTimeouts2.current = setTimeout(() => {
            animate(secondSetIndices, true);
          }, 3000);
        }, 3000);
      }
    } else return;
  }, [isHovered, isMobile, cardsData]);

  const displayedCards = isShort ? cardsData.slice(0, 6) : cardsData;

  const videoAttributes = {
    controls: false,
    controlsList: "nofullscreen nodownload noremoteplayback noplaybackrate",
  };

  return (
    <div className={appStyles.workBlock} id="Our works">
      {!isLoading ? (
        displayedCards.length > 0 &&
        displayedCards.map((card, id) => (
          <Link to={`/project/${id}`} key={id}>
            <div
              className={appStyles.workCard}
              onMouseEnter={() => handleMouseEnter(id)}
              onMouseLeave={handleMouseLeave}
              style={{
                backgroundImage: `url(${card.staticPhoto})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {!isMobile && (
                <video
                  id="gif"
                  ref={(el) => (videoRefs.current[id] = el)}
                  loop
                  muted
                  alt={`project-${id}`}
                  className={`${
                    isMobile
                      ? appStyles.fadeIn
                      : isAnimating[id]
                      ? appStyles.fadeIn
                      : appStyles.fadeOut
                  }`}
                  {...videoAttributes}
                >
                  <source src={card.gif} type="video/webm" />
                  Your browser does not support the video tag.
                </video>
              )}
              {card && (
                <div className={appStyles.textContent}>
                  <div>
                    <h4>{card.label}</h4>
                  </div>
                  <div>
                    <span className={appStyles.description}>{card.text}</span>
                  </div>
                </div>
              )}
            </div>
          </Link>
        ))
      ) : (
        <>
          <div className={appStyles.workCard}>
            <MyLoader />
          </div>
          <div className={appStyles.workCard}>
            <MyLoader />
          </div>
          <div className={appStyles.workCard}>
            <MyLoader />
          </div>
          <div className={appStyles.workCard}>
            <MyLoader />
          </div>
        </>
      )}
      {isShort && (
        <div
          className={`${appStyles.workCard} ${appStyles.last}`}
          onClick={() => setIsShort(false)}
        >
          <img loading="lazy" draggable="false" src={Liquid} alt="logo" />
          <div className={appStyles.textContentLast}>
            <div>
              <label>MORE</label>
            </div>
          </div>
          {/* <div className={appStyles.button}>
            <img loading="lazy" draggable="false" src={moreArrow} alt="arrow" />
          </div> */}
        </div>
      )}
    </div>
  );
};

export default WorkCardElement;
