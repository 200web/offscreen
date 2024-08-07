import React from "react";
import contactStyles from "../scss/contactPage.module.scss";
import Search from "../components/Search/Search";
import picture from "../assets/img/picture.webp";
import loaded from "../assets/img/accessLoaded.png";
import arrowLeft from "../assets/img/arrow Left.png";
import { Link } from "react-router-dom";

const ContactMail = ({ isClicked, setIsClicked }) => {
  const fileInputRef = React.useRef(null);
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    setSelectedFiles((prevFiles) => {
      const remainingSlots = 5 - prevFiles.length;

      const newFiles = files.slice(0, remainingSlots);

      return [...prevFiles, ...newFiles];
    });
  };

  const deleteFiles = (index) => {
    setSelectedFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((file, idx) => idx !== index);
      return updatedFiles;
    });
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handlePrevClick = () => {
    setIsClicked(false);
  };

  const sentMessage = () => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 3000);
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
            <img draggable="false" src={loaded} alt="access" />
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
                <Search placeholder="Name" />
              </div>
              <div className={contactStyles.fieldElem}>
                <Search placeholder="Email address" />
              </div>
              <div className={contactStyles.fieldElem}>
                <Search placeholder="Budget range" />
              </div>
              <div className={contactStyles.fieldElem}>
                <Search placeholder="Website link" />
              </div>
              <div className={contactStyles.fieldElem}>
                <textarea
                  placeholder="Project details"
                  className={contactStyles.textArea}
                />
                <div className={contactStyles.image} onClick={handleImageClick}>
                  <img draggable="false" src={picture} alt="data" />
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept=".png,.jpg,.jpeg,.mp4,.mov"
                  onChange={handleFileChange}
                />
                {selectedFiles.length > 0 && (
                  <div className={contactStyles.selectedFiles}>
                    {selectedFiles.map((file, index) => (
                      <div className={contactStyles.fileName}>
                        <label key={index}>{file.name}</label>
                        <div
                          className={contactStyles.cancelButton}
                          onClick={() => deleteFiles(index)}
                        >
                          <span className={contactStyles.cancel}></span>
                          <span className={contactStyles.cancel}></span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className={contactStyles.button} onClick={sentMessage}>
                <p>Send Message</p>
              </div>
            </div>
            <div className={contactStyles.pagination} onClick={handlePrevClick}>
              <div className={contactStyles.prevLayout}>
                <button className={contactStyles.buttonPrev}>
                  <img draggable="false" src={arrowLeft} />
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
