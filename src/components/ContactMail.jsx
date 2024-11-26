import React from "react";
import { useSelector } from "react-redux";
import contactStyles from "../scss/contactPage.module.scss";
import Search from "../components/Search/Search";
import loaded from "../assets/img/accessLoaded.png";
import arrowLeft from "../assets/img/arrow Left.png";
import { Link } from "react-router-dom";

const ContactMail = ({ isClicked, setIsClicked }) => {
  const fileInputRef = React.useRef(null);
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [inputValues, setInputValues] = React.useState(["", "", "", "", ""]);
  const [showBanner, setShowBanner] = React.useState(false); // State for banner

  const cards = useSelector((state) => state.contactCard.cards);

  const sentMessage = () => {
    const [name, email, phone, website, details] = inputValues;

    // Validation check
    if (!email.trim() && !phone.trim()) {
      setShowBanner(true);
      return;
    }

    setShowBanner(false);
    setIsLoaded(true);

    const formData = {
      name,
      email,
      phone,
      website,
      details,
      type: cards[0],
      goals: cards[1],
      budget: cards[2],
      deadline: cards[3],
    };

    console.log("Form Data to send:", formData);

    fetch(process.env.GOOGLE_SCRIPT_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'no-cors',
      body: JSON.stringify(formData),
    })
      .then(() => {
        console.log("Message sent successfully");
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
    <div className={`${contactStyles.sideMail} ${isClicked ? contactStyles.active : ""}`}>
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
            <img draggable="false" src={loaded} alt="access" className={contactStyles.loaded}/>
            <p>Your message has been sent, we will contact you as soon as possible</p>
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
                <Search
                  placeholder="Name"
                  onChange={(value) => handleInputChange(value, 0)}
                />
              </div>
              <div className={contactStyles.fieldElem}>
                <Search
                  placeholder="Email address"
                  onChange={(value) => handleInputChange(value, 1)}
                />
              </div>
              <div className={contactStyles.fieldElem}>
                <Search
                  placeholder="Phone number"
                  onChange={(value) => handleInputChange(value, 2)}
                />
              </div>
              <div className={contactStyles.fieldElem}>
                <Search
                  placeholder="Website link"
                  onChange={(value) => handleInputChange(value, 3)}
                />
              </div>
              <div className={contactStyles.fieldElem}>
                <textarea
                  placeholder="Project details"
                  className={contactStyles.textArea}
                  value={inputValues[4]}
                  onChange={(e) => handleInputChange(e.target.value, 4)}
                />
              </div>
              {showBanner && (
                <div className={contactStyles.banner}>
                  <p>Please enter your number or email</p>
                </div>
              )}
              <div className={contactStyles.button} onClick={sentMessage}>
                <p>Send Message</p>
              </div>
            </div>
            <div className={contactStyles.pagination} onClick={() => setIsClicked(false)}>
              <div className={contactStyles.prevLayout}>
                <button className={contactStyles.buttonPrev}>
                  <img draggable="false" src={arrowLeft} alt="Back" />
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
