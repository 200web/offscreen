import React, { useEffect } from "react";
import contactStyles from "../scss/contactPage.module.scss";
import arrowRight from "../assets/img/arrow Right.png";
import arrowLeft from "../assets/img/arrow Left.png";
import { Link, useNavigate } from "react-router-dom";
import Search from "../components/Search/Search";
import { useDispatch, useSelector } from "react-redux";
import { setItems, setOtherValue } from "../Redux/contactCardSlice";

const ContactCard = ({
  images,
  buttonText,
  headerText,
  setIsClicked,
  isClicked,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = React.useState(null);
  const [isOtherSelected, setIsOtherSelected] = React.useState(false);
  const [currentCard, setCurrentCard] = React.useState(1);
  const [searchValue, setSearchValue] = React.useState("");

  const { cards, otherValues } = useSelector((state) => state.contactCard);

  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    const index = parseInt(value, 10);
    if (index === 4) setIsOtherSelected(true);
    else setIsOtherSelected(false);
    setSelectedOption((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    const currentSelection = cards[currentCard - 1];
    setSelectedOption(currentSelection);
    setIsOtherSelected(currentSelection === 4);
    setSearchValue(otherValues[currentCard - 1] || "");
  }, [currentCard, cards, otherValues]);

  const handleNextClick = () => {
    const updatedCards = [...cards];
    updatedCards[currentCard - 1] =
      selectedOption !== null ? selectedOption : 4;
    dispatch(setItems(updatedCards));
    if (isOtherSelected) {
      dispatch(setOtherValue({ index: currentCard - 1, value: searchValue }));
    }
    if (currentCard === 4) {
      setIsClicked(true);
    } else {
      setCurrentCard((prevIndex) => (prevIndex < 4 ? prevIndex + 1 : 4));
    }
  };

  const handlePrevClick = () => {
    setCurrentCard((prevIndex) => (prevIndex > 1 ? prevIndex - 1 : 1));
  };

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  return (
    <div className={contactStyles.contactBox}>
      <div
        className={`${contactStyles.contentBox} ${
          isClicked ? contactStyles.hidden : ""
        }`}
      >
        <div className={contactStyles.cancelRow}>
          <Link to={`/`}>
            <div>
              <span className={contactStyles.cancel}></span>
              <span className={contactStyles.cancel}></span>
            </div>
          </Link>
        </div>
        <div className={contactStyles.header}>
          <span>{headerText[currentCard - 1]}</span>
        </div>
        <div className={contactStyles.content}>
          <div className={contactStyles.buttonChoice}>
            {buttonText[currentCard - 1].map((text, index) => (
              <div key={index} className={contactStyles.checkButton}>
                <input
                  type="radio"
                  id={`${text}-${index}`}
                  value={index}
                  checked={selectedOption === index}
                  onChange={handleCheckboxChange}
                />
                <label
                  htmlFor={`${text}-${index}`}
                  className={contactStyles.checkbox_custom}
                ></label>
                <label htmlFor={`${text}-${index}`}>{text}</label>
              </div>
            ))}
            <div className={contactStyles.checkButton}>
              {isOtherSelected && (
                <Search
                  value={searchValue}
                  onChange={handleSearchChange}
                  placeholder="Write your own"
                />
              )}
            </div>
          </div>
          <div
            className={`${contactStyles.descritption} ${
              currentCard > 2 ? contactStyles.notFirst : ""
            }`}
          >
            {currentCard > 1 ? (
              <img
                src={images[currentCard - 2]}
                alt="image"
                className={
                  images[currentCard - 2] === images[1]
                    ? contactStyles.dollar
                    : images[currentCard - 2] === images[2]
                    ? contactStyles.clock
                    : ""
                }
              />
            ) : (
              <span>
                Help us understand the results you want to achieve through our
                collaboration. This will allow us to offer the most effective
                solutions that meet your needs.
              </span>
            )}
          </div>
        </div>
        <div className={contactStyles.footer}>
          <div className={contactStyles.footerContent}>
            <div className={contactStyles.pageCounter}>
              <label>still </label>
              <span> {currentCard}/4</span>
            </div>
          </div>
        </div>
        <div className={contactStyles.pagination}>
          {currentCard > 1 && (
            <button
              className={contactStyles.buttonPrev}
              onClick={handlePrevClick}
            >
              <img draggable="false" src={arrowLeft} />
            </button>
          )}
          <button
            className={contactStyles.buttonNext}
            onClick={handleNextClick}
          >
            <span>
              <img draggable="false" src={arrowRight} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
