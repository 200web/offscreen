import React from "react";
import { useSelector } from "react-redux"; // Добавить импорт хука useSelector
import contactStyles from "../scss/contactPage.module.scss";
import Search from "../components/Search/Search";
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

  const sentMessage = () => {
    setIsLoaded(true);

    // Собираем данные формы в объект
    const formData = {
      name: inputValues[0], // Имя
      email: inputValues[1], // Email
      phone: inputValues[2], // Телефон
      website: inputValues[3], // Вебсайт
      details: inputValues[4], // Детали проекта
      type: cards[0], // Тип видео
      goals: cards[1], // Цели
      budget: cards[2], // Бюджет
      deadline: cards[3], // Дедлайн
    };

    console.log("Form Data to send:", formData); // Логируем данные перед отправкой

    // Отправляем данные через fetch
    fetch(process.env.GOOGLE_SCRIPT_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "no-cors", // Отключение CORS
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

  // Функция отправки сообщения
  const sendMessage = () => {
    const name = document.getElementById("name").value;
    const emailOrPhone = document.getElementById("emailOrPhone").value;
    const projectDetails = document.getElementById("projectDetails").value;

    let email = "";
    let phone = "";
    if (emailOrPhone.includes("@")) {
      email = emailOrPhone;
    } else {
      phone = emailOrPhone;
    }

    const formData = {
      name,
      email,
      phone,
      details: projectDetails,
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
        document.getElementById("name").value = "";
        document.getElementById("Phone").value = "";
        document.getElementById("email").value = "";
        document.getElementById("projectDetails").value = "";
      })
      .catch((error) => {
        console.error("Error:", error);
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
                  id="name"
                  placeholder="Name*"
                  className={contactStyles.inputField}
                />
              </div>
              <div className={contactStyles.fieldElem}>
                <input
                  type="text"
                  id="Phone"
                  placeholder="Phone number"
                  className={contactStyles.inputField}
                />
              </div>
              <div className={contactStyles.fieldElem}>
                <input
                  type="text"
                  id="email"
                  placeholder="Email address*"
                  className={contactStyles.inputField}
                />
              </div>
              <div className={contactStyles.fieldElem}>
                <textarea
                  id="projectDetails"
                  placeholder="Project details"
                  className={contactStyles.textArea}
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
