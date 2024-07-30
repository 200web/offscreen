import React from "react";
import appStyles from "../scss/app.module.scss";

const CardCarousel = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handlePrevClick = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + cards.length) % cards.length
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const getClassNames = (index) => {
    const relativeIndex = (index - currentIndex + cards.length) % cards.length;
    switch (relativeIndex) {
      case 0:
        return appStyles.card1;
      case 1:
        return appStyles.card2;
      case 2:
        return appStyles.card3;
      default:
        return "";
    }
  };

  return (
    <>
      <div className={appStyles.reviewCardsCarousel}>
        {cards.map((card, index) => (
          <div
            key={index}
            className={`${appStyles.card} ${getClassNames(index)}`}
          >
            {card}
          </div>
        ))}
      </div>
      <div className={appStyles.reviewNav}>
        <button className={appStyles.buttonPrev} onClick={handlePrevClick}>
          <span>&#129168;</span>
        </button>
        <button className={appStyles.buttonNext} onClick={handleNextClick}>
          <span>&#129170;</span>
        </button>
      </div>
    </>
  );
};

export default CardCarousel;
