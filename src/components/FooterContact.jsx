import React from "react";
import appStyles from "../scss/app.module.scss";
import { Link } from "react-router-dom";

const FooterContact = () => {
  // Функция отправки сообщения
  const sendMessage = () => {
    const name = document.getElementById('name').value;
    const emailOrPhone = document.getElementById('emailOrPhone').value;
    const projectDetails = document.getElementById('projectDetails').value;
  
    // Проверка на email (если введена @, значит это email)
    let email = '';
    let phone = '';
    if (emailOrPhone.includes('@')) {
      email = emailOrPhone;
    } else {
      phone = emailOrPhone;
    }
  
    const formData = {
      name: name,
      email: email,  // Передаём в email, если это почта
      phone: phone,  // Передаём в phone, если это номер
      details: projectDetails  // Данные о проекте в поле details
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
  

  return (
    <div className={appStyles.contactBlock}>
      <div className={appStyles.container__contact}>
        <h1 id="Contacts">Contacts</h1>
      </div>
      <div className={appStyles.cardGrid}>
        <div className={appStyles.sideMail}>
          <div className={appStyles.socialCard}>
            <div className={appStyles.mailBlank}>
              <div className={appStyles.mailTile}>Mail</div>
              <div className={appStyles.mailInf}>prod.offscreen@gmail.com</div>
              <div className={appStyles.title}>
                If you have a general or project enquiry, please drop me an
                email or <br />
                <Link to="/contact" className={appStyles.link}>fill the form</Link> — available now.
              </div>
            </div>
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
                  className={appStyles.textArea}  // сохраняем стили для textarea
                />
              </div>
              <div className={appStyles.button} onClick={sendMessage}>
                <p>Send Message</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterContact;
