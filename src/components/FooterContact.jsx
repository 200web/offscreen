import React, { useState, useEffect, useRef } from "react";
import appStyles from "../scss/app.module.scss";
import telegram from "../assets/img/telega.webp";
import facebook from "../assets/img/Face.webp";
import instagram from "../assets/img/inst.webp";
import whatsapp from "../assets/img/whatsapp.webp";
import mail from "../assets/img/mail.webp";
import { Link } from "react-router-dom";
import Footer from "./Footer";


const FooterForm = ({ sendMessage }) => {
  return (
    <div className={appStyles.fieldBox}>
      <div className={appStyles.fieldElem}>
        <input
          type="text"
          id="name"
          placeholder="Name"
          className={appStyles.inputField}
        />
      </div>
      <div className={appStyles.fieldElem}>
        <input
          type="text"
          id="emailOrPhone"
          placeholder="Email address or Phone number"
          className={appStyles.inputField}
        />
      </div>
      <div className={appStyles.fieldElem}>
        <textarea
          id="projectDetails"
          placeholder="Project details"
          className={appStyles.textArea}
        />
      </div>
      <div className={appStyles.button} onClick={sendMessage}>
        <p>Send Message</p>
      </div>
    </div>
  );
};

const FooterContact = () => {
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isMobileContact, setIsMobileContact] = useState(window.innerWidth <= 1000);

  // Проверка на изменение размера экрана
  useEffect(() => {
    const handleResize = () => setIsMobileContact(window.innerWidth <= 1000);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Функция отправки сообщения
  const sendMessage = () => {
    const name = document.getElementById('name').value;
    const emailOrPhone = document.getElementById('emailOrPhone').value;
    const projectDetails = document.getElementById('projectDetails').value;

    let email = '';
    let phone = '';
    if (emailOrPhone.includes('@')) {
      email = emailOrPhone;
    } else {
      phone = emailOrPhone;
    }

    const formData = {
      name,
      email,
      phone,
      details: projectDetails
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
        document.getElementById('name').value = '';
        document.getElementById('emailOrPhone').value = '';
        document.getElementById('projectDetails').value = '';
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  const deleteFiles = (index) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <div className={appStyles.contactBlock}>
        <div className={appStyles.container__contact}>
          <h1 id="Contacts">Contacts</h1>
        </div>

        {!isMobileContact ? (
          <div className={appStyles.cardGrid}>
            {/* Карточки для десктопной версии */}
            <div className={appStyles.socialContainer}>
              <div>

                <div className={appStyles.socialCard}>
                  <div className={appStyles.image}>
                    <img src={facebook} width={50} height={50} alt="facebook" />
                  </div>
                </div>
                <div className={appStyles.title}>Facebook</div>

              </div>
              <div>
              <div className={appStyles.socialCard}>
                
                  <div className={appStyles.image}>
                    <img src={telegram} width={70} height={70} alt="telegram" />
                  </div>

                </div>
                <div className={appStyles.title}>Telegram</div>
              </div>
              <div>
              <div className={appStyles.socialCard}>
               
                  <div className={appStyles.image}>
                    <img src={instagram} width={70} height={70} alt="instagram" />
                  </div>
                </div>
                <div className={appStyles.title}>Instagram</div>
              </div>
              <div>
              <div className={appStyles.socialCard}>
               
                  <div className={appStyles.image}>
                    <img src={whatsapp} width={70} height={70} alt="whatsapp" />
                  </div>
                </div>
                <div className={appStyles.title}>WhatsApp</div>
              </div>
            </div>

            {/* Форма для отправки сообщения */}
            <div className={appStyles.sideMail}>
              <div className={appStyles.socialCard}>
                <div className={appStyles.mailBlank}>
                  <div className={appStyles.mailTile}>Mail</div>
                  <div className={appStyles.mailInf}>prod.offscreen@gmail.com</div>
                  <div className={appStyles.title}>
                    If you have a general or project enquiry, please drop me an email or <br />
                    <Link to="/contact" className={appStyles.link}>fill the form</Link> — available now.
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
              <div className={`${appStyles.socialCard} ${appStyles.active}`}>
                <div className={appStyles.image}>
                  <img src={facebook} width={50} height={50} alt="facebook" />
                </div>
                <div className={appStyles.title}>Facebook</div>
              </div>
              <div className={`${appStyles.socialCard} ${appStyles.active}`}>
                <div className={appStyles.image}>
                  <img src={telegram} width={70} height={70} alt="telegram" />
                </div>
                <div className={appStyles.title}>Telegram</div>
              </div>
              <div className={`${appStyles.socialCard} ${appStyles.active}`}>
                <div className={appStyles.image}>
                  <img src={instagram} width={70} height={70} alt="instagram" />
                </div>
                <div className={appStyles.title}>Instagram</div>
              </div>
              <div className={`${appStyles.socialCard} ${appStyles.active}`}>
                <div className={appStyles.image}>
                  <img src={whatsapp} width={70} height={70} alt="whatsapp" />
                </div>
                <div className={appStyles.title}>WhatsApp</div>
              </div>
              <Link to={`/Contact`} className={`${appStyles.socialCard} ${appStyles.active}`}>
                <div className={appStyles.image}>
                  <img src={mail} width={70} height={70} alt="mail" />
                </div>
                <div className={appStyles.title}>mail</div>
              </Link>
            </div>

            {/* Форма для отправки сообщения */}
            <div className={appStyles.sideMail}>
              <div className={appStyles.socialCard}>
                <div className={appStyles.mailBlank}>
                  <div className={appStyles.mailTile}>Mail </div>
                  <div className={appStyles.mailInf}>prod.offscreen@gmail.com</div>
                  <div className={appStyles.title}>
                    If you have a general or project enquiry, please drop me an email or <br />
                    <Link to="/contact" className={appStyles.link}>fill the form</Link> — available now.
                  </div>
                </div>
                <FooterForm sendMessage={sendMessage} />
              </div>
            </div>
          </div>
        )}

      </div>
      <Footer />
    </div>



  );
};

export default FooterContact;
