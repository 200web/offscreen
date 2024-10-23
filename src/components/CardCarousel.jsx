import React from "react";
import appStyles from "../scss/app.module.scss";
import arrowLeft from "../assets/img/arrow Left.png";
import arrowRight from "../assets/img/arrow Right.png";

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
      case 3:
        return appStyles.card4;
      case 4:
        return appStyles.card5;
      default:
        return appStyles.hidden; // Скрывать остальные отзывы
    }
  };

  return (
    <>
      <div className={appStyles.reviewCardsCarousel}>
        {/* <div className={appStyles.cardsContainer}> */}
        {cards.map((card, index) => (
          <div
            key={index}
            className={`${appStyles.card} ${getClassNames(index)}`}
          >
            {card}
          </div>
        ))}
        {/* </div> */}

        <div className={appStyles.reviewNav}>
          <button className={appStyles.buttonPrev} onClick={handlePrevClick}>
            <img loading="lazy" draggable="false" src={arrowLeft} />
          </button>
          <button className={appStyles.buttonNext} onClick={handleNextClick}>
            <img loading="lazy" draggable="false" src={arrowRight} />
          </button>
        </div>
      </div>
    </>
  );
};

export default CardCarousel;
