import React from "react";
import appStyles from "../scss/app.module.scss";
import Search from "../components/Search/Search";
import picture from "../assets/img/picture.webp";
import telegram from "../assets/img/telega.webp";
import facebook from "../assets/img/Face.webp";
import instagram from "../assets/img/inst.webp";
import whatsapp from "../assets/img/whatsapp.webp";
import mail from "../assets/img/mail.webp";
import { setIsLoaded } from "../Redux/introSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const FooterContact = () => {
  const fileInputRef = React.useRef(null);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 1000);
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const dispatch = useDispatch();
  const [name, setName] = React.useState('');
  const [emailOrPhone, setEmailOrPhone] = React.useState('');
  const [projectDetails, setProjectDetails] = React.useState('');
  const [isLoaded, setIsLoaded] = React.useState(false);

   // Функция отправки сообщения
   const sendMessage = () => {
    setIsLoaded(true);

  
    const formData = {
      name: name,
      emailOrPhone: emailOrPhone,
      projectDetails: projectDetails,
    };

    console.log("Form Data to send:", formData); // Для проверки данных перед отправкой

    fetch('https://script.google.com/macros/s/AKfycbx-1E8RAP0fopITonzq3FBYKHtKx9InDjpyC0SYq7ymXkRH4AaxJbZj6hoYg1rTtdktNA/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'no-cors', // Отключение CORS
      body: JSON.stringify(formData),
    })
    .then(() => {
      console.log("Message sent successfully111111111111");
      setIsLoaded(false); // Сброс загрузки после отправки
      setName(''); // Очищаем поля после успешной отправки
      setEmailOrPhone('');
      setProjectDetails('');
    })
    .catch((error) => {
      console.error("Error:", error);
      setIsLoaded(false);
    });
  };

  const deleteFiles = (index) => {
    setSelectedFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((file, idx) => idx !== index);
      return updatedFiles;
    });
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    setSelectedFiles((prevFiles) => {
      const remainingSlots = 5 - prevFiles.length;

      const newFiles = files.slice(0, remainingSlots);

      return [...prevFiles, ...newFiles];
    });
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1000);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={appStyles.contactBlock}>
      <div className={appStyles.container__contact}>
        <h1 id="Contacts">Contacts</h1>
      </div>
      <div className={appStyles.cardGrid}>
            {/* <div className={appStyles.socialContainer}>
              <div>
                <div className={`${appStyles.socialCard} ${appStyles.active}`}>
                  <div className={appStyles.image}>
                    <img src={facebook} width={50} height={50} alt="facebook" />
                  </div>
                </div>
                <div className={appStyles.title}>Facebook</div>
              </div>
              <div>
                <div className={`${appStyles.socialCard} ${appStyles.active}`}>
                  <div className={appStyles.image}>
                    <img src={telegram} width={70} height={70} alt="facebook" />
                  </div>
                </div>
                <div className={appStyles.title}>Telegram</div>
              </div>
              <div>
                <div className={`${appStyles.socialCard} ${appStyles.active}`}>
                  <div className={appStyles.image}>
                    <img
                      src={instagram}
                      width={70}
                      height={70}
                      alt="facebook"
                    />
                  </div>
                </div>
                <div className={appStyles.title}>Instagram</div>
              </div>
              <div>
                <div className={`${appStyles.socialCard} ${appStyles.active}`}>
                  <div className={appStyles.image}>
                    <img src={whatsapp} width={70} height={70} alt="facebook" />
                  </div>
                </div>
                <div className={appStyles.title}>WhatsApp</div>
              </div>
            </div> */}
            <div className={appStyles.sideMail}>
              <div className={appStyles.socialCard}>
                <div className={appStyles.mailBlank}>
                  <div className={appStyles.mailTile}>Mail</div>
                  <div className={appStyles.mailInf}>
                     prod.offscreen@gmail.com
                  </div>
                  <div className={appStyles.title}>
                    If you have a general or project enquiry, please drop me an
                    email or <br /><Link to="/contact" className={appStyles.link}>fill the form</Link> — available now.
                  </div>
                </div>
                <div className={appStyles.fieldBox}>
                <div className={appStyles.fieldElem}>
                <Search
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className={appStyles.fieldElem}>
                <Search
                  placeholder="Email address or Phone number"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                />
              </div>
              <div className={appStyles.fieldElem}>
                <textarea
                  placeholder="Project details"
                  className={appStyles.textArea}
                  value={projectDetails}
                  onChange={(e) => setProjectDetails(e.target.value)}
                />
              </div>
              <div className={appStyles.button} onClick={sendMessage}>
                <p>Send Message</p>
              </div>
              {isLoaded && <p>Sending message...</p>}
            </div>
                </div>
            </div>
        {/* {isMobile && (
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
                  <img src={telegram} width={70} height={70} alt="facebook" />
                </div>
                <div className={appStyles.title}>Telegram</div>
              </div>
              <div className={`${appStyles.socialCard} ${appStyles.active}`}>
                <div className={appStyles.image}>
                  <img src={instagram} width={70} height={70} alt="facebook" />
                </div>
                <div className={appStyles.title}>Instagram</div>
              </div>
              <div className={`${appStyles.socialCard} ${appStyles.active}`}>
                <div className={appStyles.image}>
                  <img src={whatsapp} width={70} height={70} alt="facebook" />
                </div>
                <div className={appStyles.title}>WhatsApp</div>
              </div>
              <Link
                to={`/Contact`}
                className={`${appStyles.socialCard} ${appStyles.active}`}
              >
                <div className={appStyles.image}>
                  <img src={mail} width={70} height={70} alt="facebook" />
                </div>
                <div className={appStyles.title}>mail</div>
              </Link>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default FooterContact;
