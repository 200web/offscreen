import React, { useState, useEffect, useRef } from "react";
import appStyles from "../scss/app.module.scss";
import contactStyles from "../scss/contactPage.module.scss";
import telegram from "../assets/img/telega.webp";
import facebook from "../assets/img/Face.webp";
import instagram from "../assets/img/inst.webp";
import whatsapp from "../assets/img/whatsapp.webp";
import mail from "../assets/img/mail.webp";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const FooterForm = ({ sendMessage }) => {
  const [inputValues, setInputValues] = React.useState(["", "", "", "", ""]);
  const [showBanner, setShowBanner] = React.useState(false); // State for banner
  const [isSended, setIsSended] = React.useState(false);
  const [isSending, setIsSending] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const sentMessage = () => {
    const [name, email, phone, website, details] = inputValues;

    // Validation check

    if (isSended) {
      return;
    }

    if (!email.trim() && !phone.trim()) {
      console.log("banner");
      setShowBanner(true);
      return;
    }

    setShowBanner(false);

    const formData = {
      name,
      email,
      phone,
      website,
      details,
    };

    console.log("Form Data to send:", formData);

    setIsSending(true);
    fetch(
      "https://script.google.com/macros/s/AKfycbx-1E8RAP0fopITonzq3FBYKHtKx9InDjpyC0SYq7ymXkRH4AaxJbZj6hoYg1rTtdktNA/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify(formData),
      }
    )
      .then(() => {
        setIsSending(false);
        setIsSended(true);
        console.log("Message sent successfully");
      })
      .catch((error) => {
        setIsSending(false);
        setIsError(true);
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
    <div className={appStyles.fieldBox}>
      <div className={appStyles.fieldElem}>
        <input
          type="text"
          id="name"
          placeholder="Name"
          className={appStyles.inputField}
          onChange={(e) => handleInputChange(e.target.value, 0)}
        />
      </div>
      <div className={appStyles.fieldElem}>
        <input
          type="text"
          id="name"
          placeholder="Email address"
          className={appStyles.inputField}
          onChange={(e) => handleInputChange(e.target.value, 1)}
        />
      </div>
      <div className={appStyles.fieldElem}>
        <input
          type="text"
          id="Phone"
          placeholder="Phone number"
          className={appStyles.inputField}
          onChange={(e) => handleInputChange(e.target.value, 2)}
        />
      </div>
      <div className={appStyles.fieldElem}>
        <input
          type="text"
          id="email"
          placeholder="Website link"
          className={appStyles.inputField}
          onChange={(e) => handleInputChange(e.target.value, 3)}
        />
      </div>
      <div className={appStyles.fieldElem}>
        <textarea
          id="projectDetails"
          placeholder="Project details"
          value={inputValues[4]}
          className={appStyles.textArea}
          onChange={(e) => handleInputChange(e.target.value, 4)}
        />
      </div>
      {showBanner && (
        <div className={contactStyles.banner}>
          <p>Please enter your number or email</p>
        </div>
      )}
      <div className={appStyles.button} onClick={sentMessage}>
        <p>
          {isSended
            ? "Sended"
            : isSending
            ? "Sending..."
            : isError
            ? "Error, try again"``
            : "Send Message"}
        </p>
      </div>
    </div>
  );
};

const FooterContact = () => {
  const [isMobileContact, setIsMobileContact] = useState(
    window.innerWidth <= 1000
  );

  // Проверка на изменение размера экрана
  useEffect(() => {
    const handleResize = () => setIsMobileContact(window.innerWidth <= 1000);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    <>
      <div className={appStyles.contactBlock}>
        <div className={appStyles.container__contact}>
          <h1 id="Contacts">Contacts</h1>
        </div>

        {!isMobileContact ? (
          <div className={appStyles.cardGrid}>
            <div className={appStyles.socialContainer}>
              {/* Facebook */}
              <a
                href="https://www.facebook.com/offscreen.pro/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={appStyles.socialCard}>
                  <div className={appStyles.image}>
                    <img
                      loading="lazy"
                      src={facebook}
                      width={50}
                      height={50}
                      alt="facebook"
                    />
                  </div>
                </div>
                <div className={appStyles.title}>Facebook</div>
              </a>

              {/* Telegram */}
              <a
                href="https://t.me/Offscreen_pro"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={appStyles.socialCard}>
                  <div className={appStyles.image}>
                    <img
                      loading="lazy"
                      src={telegram}
                      width={70}
                      height={70}
                      alt="telegram"
                    />
                  </div>
                </div>
                <div className={appStyles.title}>Telegram</div>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/offscreen.pro/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={appStyles.socialCard}>
                  <div className={appStyles.image}>
                    <img
                      loading="lazy"
                      src={instagram}
                      width={70}
                      height={70}
                      alt="instagram"
                    />
                  </div>
                </div>
                <div className={appStyles.title}>Instagram</div>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/+48451117515"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={appStyles.socialCard}>
                  <div className={appStyles.image}>
                    <img
                      loading="lazy"
                      src={whatsapp}
                      width={70}
                      height={70}
                      alt="whatsapp"
                    />
                  </div>
                </div>
                <div className={appStyles.title}>WhatsApp</div>
              </a>
            </div>

            <div className={appStyles.sideMail}>
              <div className={appStyles.socialCard}>
                <div className={appStyles.mailBlank}>
                  <div className={appStyles.mailContainer}>
                    <div className={appStyles.mailTile}>Mail</div>
                    <div className={appStyles.mailInf}>
                      <a href="mailto:prod.offscreen@gmail.com">
                        prod.offscreen@gmail.com
                      </a>
                    </div>

                    <div className={appStyles.mailTile}>Phone</div>
                    <div className={appStyles.mailInf}>
                      <a href="tel:+48451117515" className={appStyles.link}>
                        +48451117515
                      </a>
                    </div>
                  </div>

                  <div className={appStyles.title}>
                    If you have a general or project enquiry, please drop me an
                    email or
                    <br />
                    <Link to="/contact" className={appStyles.link}>
                      fill the form
                    </Link>{" "}
                    — available now.
                  </div>
                </div>
                <FooterForm sendMessage={sendMessage} />
              </div>
            </div>
          </div>
        ) : (
          // Мобильная версия
          <div className={appStyles.cardGridMobile}>
            <div className={appStyles.socialContainerMobile}>
              <Link
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href =
                    "https://www.facebook.com/offscreen.pro/";
                }}
                className={`${appStyles.socialCard} ${appStyles.active}`}
              >
                <div className={appStyles.image}>
                  <img
                    loading="lazy"
                    src={facebook}
                    width={50}
                    height={50}
                    alt="facebook"
                  />
                </div>
                <div className={appStyles.title}>Facebook</div>
              </Link>

              <Link
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "https://t.me/Offscreen_pro";
                }}
                className={`${appStyles.socialCard} ${appStyles.active}`}
              >
                <div className={appStyles.image}>
                  <img
                    loading="lazy"
                    src={telegram}
                    width={70}
                    height={70}
                    alt="telegram"
                  />
                </div>
                <div className={appStyles.title}>Telegram</div>
              </Link>

              <Link
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href =
                    "https://www.instagram.com/offscreen.pro/";
                }}
                className={`${appStyles.socialCard} ${appStyles.active}`}
              >
                <div className={appStyles.image}>
                  <img
                    loading="lazy"
                    src={instagram}
                    width={70}
                    height={70}
                    alt="instagram"
                  />
                </div>
                <div className={appStyles.title}>Instagram</div>
              </Link>

              <Link
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "https://wa.me/+48451117515";
                }}
                className={`${appStyles.socialCard} ${appStyles.active}`}
              >
                <div className={appStyles.image}>
                  <img
                    loading="lazy"
                    src={whatsapp}
                    width={70}
                    height={70}
                    alt="whatsapp"
                  />
                </div>
                <div className={appStyles.title}>WhatsApp</div>
              </Link>

              <Link
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "mailto:prod.offscreen@gmail.com";
                }}
                className={`${appStyles.socialCard} ${appStyles.active}`}
              >
                <div className={appStyles.image}>
                  <img
                    loading="lazy"
                    src={mail}
                    width={70}
                    height={70}
                    alt="mail"
                  />
                </div>
                <div className={appStyles.title}>mail</div>
              </Link>
            </div>

            <div className={appStyles.sideMail}>
              <div className={appStyles.socialCard}>
                <div className={appStyles.mailBlank}>
                  <div className={appStyles.mailContainer}>
                    <div className={appStyles.mailTile}>Mail</div>
                    <div className={appStyles.mailInf}>
                      <a href="mailto:prod.offscreen@gmail.com">
                        prod.offscreen@gmail.com
                      </a>
                    </div>

                    <div className={appStyles.mailTile}>Phone</div>
                    <div className={appStyles.mailInf}>
                      <a href="tel:+48451117515" className={appStyles.link}>
                        +48451117515
                      </a>
                    </div>
                  </div>
                  <div className={appStyles.title}>
                    If you have a general or project enquiry, please drop me an
                    email or <br />
                    <Link to="/contact" className={appStyles.link}>
                      fill the form
                    </Link>{" "}
                    — available now.
                  </div>
                </div>
                <FooterForm sendMessage={sendMessage} />
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default FooterContact;
