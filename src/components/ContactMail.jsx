import React from "react";
import { useSelector } from "react-redux"; // Добавить импорт хука useSelector
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
  const [inputValues, setInputValues] = React.useState(["", "", "", "", ""]);

  const cards = useSelector((state) => state.contactCard.cards);
  const otherValues = useSelector((state) => state.contactCard.otherValues);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles((prevFiles) => {
      const remainingSlots = 5 - prevFiles.length;
      const newFiles = files.slice(0, remainingSlots);
      return [...prevFiles, ...newFiles];
    });
  };

  const deleteFiles = (index) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((file, idx) => idx !== index));
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
    setIsLoaded(true);
  
    // Собираем данные формы в объект
    const formData = {
      name: inputValues[0],      // Имя
      email: inputValues[1],     // Email
      phone: inputValues[2],     // Телефон
      website: inputValues[3],   // Вебсайт
      details: inputValues[4],   // Детали проекта
      type: cards[0],            // Тип видео
      goals: cards[1],           // Цели
      budget: cards[2],          // Бюджет
      deadline: cards[3]         // Дедлайн
    };
  
    console.log("Form Data to send:", formData); // Логируем данные перед отправкой
  
    // Отправляем данные через fetch
    fetch('https://script.google.com/macros/s/AKfycbx-1E8RAP0fopITonzq3FBYKHtKx9InDjpyC0SYq7ymXkRH4AaxJbZj6hoYg1rTtdktNA/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'no-cors', // Отключение CORS
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
            <img draggable="false" src={loaded} alt="access" />
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
