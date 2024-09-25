import React, { useCallback, useEffect } from "react";
import appStyles from "../scss/app.module.scss";
import TeamHead from "../assets/img/TeamHead.gif";
import anonim from "../assets/img/anonim.webp";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const TeamCardPresentation = ({ images }) => {
  const [isAnimating, setIsAnimating] = React.useState(images.map(() => false));
  const [isPortraitClicked, setIsPortraitClicked] = React.useState(false);
  const [isTextChanging, setIsTextChanging] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 1200);
  const [currentImages, setCurrentImages] = React.useState(
    images.map(() => anonim)
  );
  const [currentCard, setCurrentCard] = React.useState({
    profession: "Move and stand your mouse on portrait",
    name: "To see our team",
    description: [""],
  });
  const animationTimeouts = React.useRef(images.map(() => null));
  const animationTimeIntervale = React.useRef(null);
  const animationTimeouts2 = React.useRef(null);
  const { cards } = useSelector((state) => state.teamCard);

  const automatAnimateStart = (id) => {
    if (isAnimating.some((anim) => anim === true)) {
      return;
    }
    if (currentImages.some((img) => img !== anonim)) {
      const activeIds = currentImages
        .map((img, index) => (img !== anonim ? index : -1))
        .filter((index) => index !== -1);
      currentImages[activeIds] = anonim;
      setCurrentImages(currentImages);
    }
    if (isAnimating) {
      const newAnimating = [...isAnimating];
      newAnimating[id] = true;
      setIsAnimating(newAnimating);
      setIsTextChanging(true);

      const newImages = [...currentImages];
      newImages[id] = TeamHead;
      setCurrentImages(newImages);

      animationTimeouts.current[id] = setTimeout(() => {
        const updatedImages = [...currentImages];
        updatedImages[id] = images[id];
        setCurrentImages(updatedImages);

        const cartItem = cards.find((obj) => id === obj.id);
        setCurrentCard(cartItem);

        const resetAnimating = newAnimating.map(() => false);
        setIsAnimating(resetAnimating);
        setIsTextChanging(false);
        if (currentImages[id] === images[id]) {
          const firstUpdatedImages = currentImages.map(() => anonim);
          setCurrentImages(firstUpdatedImages);
        }
      }, 300);
    }
  };

  const handleMouseEnter = (id) => {
    clearInterval(animationTimeIntervale.current);
    clearTimeout(animationTimeouts2.current);
    if (isAnimating.some((anim) => anim === true)) {
      return;
    }
    if (currentImages.some((img) => img !== anonim)) {
      const activeIds = currentImages
        .map((img, index) => (img !== anonim ? index : -1))
        .filter((index) => index !== -1);
      currentImages[activeIds] = anonim;
      setCurrentImages(currentImages);
    }
    if (isAnimating) {
      const newAnimating = [...isAnimating];
      newAnimating[id] = true;
      setIsAnimating(newAnimating);
      setIsTextChanging(true);

      const newImages = [...currentImages];
      newImages[id] = TeamHead;
      setCurrentImages(newImages);

      animationTimeouts.current[id] = setTimeout(() => {
        const updatedImages = [...currentImages];
        updatedImages[id] = images[id];
        setCurrentImages(updatedImages);

        const cartItem = cards.find((obj) => id === obj.id);
        setCurrentCard(cartItem);

        const resetAnimating = newAnimating.map(() => false);
        setIsAnimating(resetAnimating);
        setIsTextChanging(false);
        if (currentImages[id] === images[id]) {
          const firstUpdatedImages = currentImages.map(() => anonim);
          setCurrentImages(firstUpdatedImages);
        }
      }, 300);
    }
  };

  const handleMouseEnterMobile = (id) => {
    if (isPortraitClicked) {
      handleMouseLeave();
      return;
    }
    setIsPortraitClicked(true);
    clearInterval(animationTimeIntervale.current);
    clearTimeout(animationTimeouts2.current);
    if (isAnimating.some((anim) => anim === true)) {
      return;
    }
    if (currentImages.some((img) => img !== anonim)) {
      const activeIds = currentImages
        .map((img, index) => (img !== anonim ? index : -1))
        .filter((index) => index !== -1);
      currentImages[activeIds] = anonim;
      setCurrentImages(currentImages);
    }
    if (isAnimating) {
      const newAnimating = [...isAnimating];
      newAnimating[id] = true;
      setIsAnimating(newAnimating);
      setIsTextChanging(true);

      const newImages = [...currentImages];
      newImages[id] = TeamHead;
      setCurrentImages(newImages);

      const updatedImages = [...currentImages];
      updatedImages[id] = images[id];
      setCurrentImages(updatedImages);

      const cartItem = cards.find((obj) => id === obj.id);
      setCurrentCard(cartItem);

      const resetAnimating = newAnimating.map(() => false);
      setIsAnimating(resetAnimating);
      setIsTextChanging(false);
      if (currentImages[id] === images[id]) {
        const firstUpdatedImages = currentImages.map(() => anonim);
        setCurrentImages(firstUpdatedImages);
      }
    }
  };

  const automatAnimateEnd = (id) => {
    if (isAnimating.some((anim) => anim === true)) {
      if (animationTimeouts.current[id]) {
        clearTimeout(animationTimeouts.current[id]);
      }
      const resetAnimating = isAnimating.map(() => false);
      setIsAnimating(resetAnimating);
      const newImages = [...currentImages];
      newImages[id] = anonim;
      setCurrentImages(newImages);
      setIsTextChanging(false);
      setCurrentCard({
        profession: "Move and stand your mouse on portrait",
        name: "To see our team",
        description: [""],
      });
      return;
    }
    const newImages = [...currentImages];
    newImages[id] = anonim;
    setCurrentImages(newImages);
  };

  const handleMouseLeave = (id) => {
    setIsPortraitClicked(false);
    if (isAnimating.some((anim) => anim === true)) {
      if (animationTimeouts.current[id]) {
        clearTimeout(animationTimeouts.current[id]);
      }
      const resetAnimating = isAnimating.map(() => false);
      setIsAnimating(resetAnimating);
      const newImages = [...currentImages];
      newImages[id] = anonim;
      setCurrentImages(newImages);
      setIsTextChanging(false);
      setCurrentCard({
        profession: "Move and stand your mouse on portrait",
        name: "To see our team",
        description: [""],
      });
      return;
    }
    const newImages = [...currentImages];
    newImages[id] = anonim;
    setCurrentImages(newImages);
    callback();
  };

  useEffect(() => {
    let currentId = 0;

    animationTimeIntervale.current = setInterval(() => {
      automatAnimateStart(currentId);
      animationTimeouts2.current = setTimeout(() => {
        automatAnimateEnd(currentId);
        currentId = (currentId + 1) % images.length;
      }, 4000);
    }, 4100);
  }, []);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1200);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const callback = useCallback(() => {
    let currentId = 0;

    animationTimeIntervale.current = setInterval(() => {
      automatAnimateStart(currentId);
      animationTimeouts2.current = setTimeout(() => {
        automatAnimateEnd(currentId);
        currentId = (currentId + 1) % images.length;
      }, 4000);
    }, 4100);
  }, []);

  return (
    <>
      <div className={appStyles.teamDescription}>
        <div className={appStyles.header}>
          <span>Our team</span>
        </div>
        <div
          className={`${appStyles.textContent} ${
            isTextChanging ? appStyles.fadeOut : appStyles.fadeIn
          }`}
        >
          <div className={appStyles.profession}>{currentCard.profession}</div>
          <div className={appStyles.name}>{currentCard.name}</div>
          <div className={appStyles.addInf}>
            {currentCard.description.map((text) => (
              <div>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={appStyles.button}>
          {currentCard.description[0] !== "" && (
            <Link
              to={`/team/${currentCard.id}`}
              className={appStyles.contactButton}
            >
              <span>SEE MORE</span>
            </Link>
          )}
        </div>
      </div>
      <div className={appStyles.teamPresentation}>
        {!isMobile &&
          images.map((photo, id) => (
            <Link to={!isAnimating[id] && `/team/${currentCard.id}`} key={id}>
              <div
                className={appStyles.portrait}
                onMouseEnter={() => handleMouseEnter(id)}
                // onMouseLeave={() => handleMouseLeave(id)}
              >
                <img
                  id={`video-${id}`}
                  src={currentImages[id]}
                  alt={`portrait-${id}`}
                  className={
                    isAnimating[id] ? appStyles.fadeOut : appStyles.fadeIn
                  }
                />
              </div>
            </Link>
          ))}
        {isMobile &&
          images.map((photo, id) => (
            <div key={id}>
              <div
                className={`${appStyles.portrait} ${
                  isPortraitClicked &&
                  currentImages[id] !== anonim &&
                  appStyles.active
                }`}
                onClick={() => handleMouseEnterMobile(id)}
              >
                <div className={appStyles.image}>
                  <img
                    id={`video-${id}`}
                    src={currentImages[id]}
                    alt={`portrait-${id}`}
                  />
                </div>
                <span
                  className={
                    isPortraitClicked
                      ? ""
                      : currentImages[id] === anonim
                      ? ""
                      : isAnimating[id]
                      ? ""
                      : appStyles.fadeIn
                  }
                >
                  CEO - Director
                </span>
                <div className={appStyles.descriptionBox}>
                  <div
                    className={`${appStyles.profession} ${
                      isPortraitClicked
                        ? currentImages[id] === anonim
                          ? ""
                          : isAnimating[id]
                          ? ""
                          : appStyles.fadeIn
                        : ""
                    }`}
                  >
                    {currentCard.profession}
                  </div>
                  <div
                    className={`${appStyles.name} ${
                      isPortraitClicked
                        ? currentImages[id] === anonim
                          ? ""
                          : isAnimating[id]
                          ? ""
                          : appStyles.fadeIn
                        : ""
                    }`}
                  >
                    {currentCard.name}
                  </div>
                  <div
                    className={`${appStyles.addInf} ${
                      isPortraitClicked
                        ? currentImages[id] === anonim
                          ? ""
                          : isAnimating[id]
                          ? ""
                          : appStyles.fadeIn
                        : ""
                    }`}
                  >
                    {currentCard.description.map((text) => (
                      <div>
                        <p>{text}</p>
                      </div>
                    ))}
                  </div>
                  {/* <div
                    className={`${appStyles.button} ${
                      isPortraitClicked
                        ? currentImages[id] === anonim
                          ? ""
                          : isAnimating[id]
                          ? ""
                          : appStyles.fadeIn
                        : ""
                    }`}
                  >
                    {currentCard.description[0] !== "" && (
                      <Link
                        to={`/project/1`}
                        className={appStyles.contactButton}
                      >
                        <span>View projects</span>
                      </Link>
                    )}
                  </div> */}
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default TeamCardPresentation;
