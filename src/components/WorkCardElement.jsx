import React, { useEffect, useState } from "react";
import appStyles from "../scss/app.module.scss";
import workHeadGif from "../assets/img/workHead.gif";
import moreArrow from "../assets/img/moreArrow.png";
import { Link } from "react-router-dom";
import axios from "axios";

const WorkCardElement = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
  const [isHovered, setIsHovered] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isShort, setIsShort] = React.useState(true);
  const animationTimeouts = React.useRef();
  const animationTimeouts2 = React.useRef();
  const [cardsData, setCardsData] = useState([]);
  const [isAnimating, setIsAnimating] = useState(cardsData?.map(() => false));

  useEffect(() => {
    async function fetchCards() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://66d60cecf5859a7042683b4d.mockapi.io/Cards`
        );
        setCardsData(data);
        setIsLoading(false);
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
  }, [isHovered, isMobile, cardsData]);

  // Определение отображаемых данных на основе состояния "isShort"
  const displayedCards = isShort ? cardsData.slice(0, 5) : cardsData;

  return (
    <div className={appStyles.workBlock} id="our works">
      {!isLoading &&
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
              <img
                draggable="false"
                src={card.gif}
                alt={`project-${id}`}
                className={`${
                  isMobile
                    ? appStyles.fadeIn
                    : isAnimating[id]
                    ? appStyles.fadeIn
                    : appStyles.fadeOut
                }`}
              />
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
        ))}
      <div className={appStyles.workCard} onClick={() => setIsShort(false)}>
        <img draggable="false" src={workHeadGif} alt="logo" />
        <div className={appStyles.textContent}>
          <div>
            <label>Show more</label>
          </div>
        </div>
        <div className={appStyles.button}>
          <img draggable="false" src={moreArrow} alt="arrow" />
        </div>
      </div>
    </div>
  );
};

export default WorkCardElement;
