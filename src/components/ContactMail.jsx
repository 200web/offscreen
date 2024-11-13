import React from "react";
import { useSelector } from "react-redux";
import contactStyles from "../scss/contactPage.module.scss";
import picture from "../assets/img/picture.webp";
import loaded from "../assets/img/accessLoaded.png";
import arrowLeft from "../assets/img/arrow Left.png";
import { Link } from "react-router-dom";

const ContactMail = ({ isClicked, setIsClicked }) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [inputValues, setInputValues] = React.useState(["", "", "", "", ""]);

  const cards = useSelector((state) => state.contactCard.cards);
  const otherValues = useSelector((state) => state.contactCard.otherValues);

  const handlePrevClick = () => {
    setIsClicked(false);
  };

  const sendMessage = () => {
    setIsLoaded(true);

    // Gather form data from inputValues directly
    console.log("API Endpoint:", process.env.REACT_APP_GOOGLE_SCRIPT_API); 
    const formData = {
      name: inputValues[0],
      email: inputValues[1].includes("@") ? inputValues[1] : "",
      phone: inputValues[1].includes("@") ? "" : inputValues[1],
      website: inputValues[2],
      details: inputValues[3],
      type: cards[0],
      goals: cards[1],
      budget: cards[2],
      deadline: cards[3],
    };

    console.log("Form Data to send:", formData);

    fetch(process.env.GOOGLE_SCRIPT_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "no-cors",
      body: JSON.stringify(formData),
    })
      .then(() => {
        console.log("Message sent successfully");
        setInputValues(["", "", "", "", ""]); // Clear the form
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleInputChange = (value, index) => {
    setInputValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[index] = value;
      return updatedValues;
    });
  };

  return (
    <div
      className={`${contactStyles.sideMail} ${
        isClicked ? contactStyles.active : ""
      }`}
    >
      <div className={contactStyles.socialCard}>
        {isLoaded ? (
          <div className={contactStyles.loaded}>
            <div className={contactStyles.cancelRow}>
              <Link to={`/`}>
                <div>
                  <span className={contactStyles.cancel}></span>
                  <span className={contactStyles.cancel}></span>
                </div>
              </Link>
            </div>
            <img loading="lazy" draggable="false" src={loaded} alt="access" />
            <p>
              Your message has been sent, we will contact you as soon as
              possible
            </p>
          </div>
        ) : (
          <>
            <div className={contactStyles.cancelRow}>
              <Link to={`/`}>
                <div>
                  <span className={contactStyles.cancel}></span>
                  <span className={contactStyles.cancel}></span>
                </div>
              </Link>
            </div>
            <div className={contactStyles.header}>
              <span>Mail</span>
            </div>
            <div className={contactStyles.fieldBox}>
              <div className={contactStyles.fieldElem}>
                <input
                  type="text"
                  placeholder="Name*"
                  className={contactStyles.inputField}
                  value={inputValues[0]}
                  onChange={(e) => handleInputChange(e.target.value, 0)}
                />
              </div>
              <div className={contactStyles.fieldElem}>
                <input
                  type="text"
                  placeholder="Phone number or Email*"
                  className={contactStyles.inputField}
                  value={inputValues[1]}
                  onChange={(e) => handleInputChange(e.target.value, 1)}
                />
              </div>
              <div className={contactStyles.fieldElem}>
                <input
                  type="text"
                  placeholder="Website"
                  className={contactStyles.inputField}
                  value={inputValues[2]}
                  onChange={(e) => handleInputChange(e.target.value, 2)}
                />
              </div>
              <div className={contactStyles.fieldElem}>
                <textarea
                  placeholder="Project details"
                  className={contactStyles.textArea}
                  value={inputValues[3]}
                  onChange={(e) => handleInputChange(e.target.value, 3)}
                />
              </div>
              <div className={contactStyles.button} onClick={sendMessage}>
                <p>Send Message</p>
              </div>
            </div>
            <div className={contactStyles.pagination} onClick={handlePrevClick}>
              <div className={contactStyles.prevLayout}>
                <button className={contactStyles.buttonPrev}>
                  <img loading="lazy" draggable="false" src={arrowLeft} />
                </button>
                <label>Back</label>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactMail;
