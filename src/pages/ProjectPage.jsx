import React, { useRef } from "react";
import project from "../scss/projectPage.module.scss";
import footer from "../scss/components/footer.module.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import Search from "../components/Search/Search";
import picture from "../assets/img/picture.webp";
import telegram from "../assets/img/telega.webp";
import facebook from "../assets/img/Face.webp";
import instagram from "../assets/img/inst.webp";
import whatsapp from "../assets/img/whatsapp.webp";
import mail from "../assets/img/mail.webp";
import maneken from "../assets/img/maneken.png";
import arrow from "../assets/img/Arrow.png";
import skate from "../assets/img/skateBoard.gif";
import mouth from "../assets/img/mouth.png";
import { setIsLoaded } from "../Redux/introSlice";
import { useDispatch } from "react-redux";
import HVideo from "../assets/img/HVideo.MP4";
import axios from "axios";

const ProjectPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isGifPlaying, setIsGifPlaying] = React.useState(false);
  const fileInputRef = React.useRef(null);
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const [projectData, setProjectData] = React.useState([]);
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 690);
  const [isMobileContact, setIsMobileContact] = React.useState(
    window.innerWidth <= 1000
  );
  const [isHovered, setIsHovered] = React.useState(false);
  const videoRef = useRef(null);

  const dispatch = useDispatch();

  React.useEffect(() => {
    async function fetchCards() {
      try {
        const { data } = await axios.get(
          `https://66d60cecf5859a7042683b4d.mockapi.io/PagesContent/?id=` + id
        );
        setProjectData(data[0]);
      } catch (error) {
        console.log(error);
      }
    }

    fetchCards();
  }, []);

  const handleMenuVisible = () => {
    setMenuVisible(!menuVisible);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (isGifPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsGifPlaying(!isGifPlaying);
  };

  const handleMouseEnter = () => {
    if (!isHovered) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
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
    dispatch(setIsLoaded(true));
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 690);
      setIsMobileContact(window.innerWidth <= 1000);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={project.layout}>
      <div
        className={
          isHovered === true
            ? `${project.Headerlayout} ${project.active}`
            : `${project.Headerlayout}`
        }
      >
        <div
          className={project.headerContent}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className={project.titleSide}>OffScreen</div>
          <div
            className={`${project.buttonSide} ${
              isMobile ? project.mobile : ""
            } ${menuVisible && isMobile ? project.active : ""}`}
          >
            <ul>
              {!isMobile && (
                <Link to={`/Contact`} className={project.h_but_s}>
                  <span>get in touch</span>
                </Link>
              )}
            </ul>
          </div>
          {isMobile && (
            <Link to={`/Contact`} className={project.h_but_s_Mobile}>
              <span>get in touch</span>
            </Link>
          )}
          <div
            className={`${project.menuButton} ${
              isMobile ? project.visible : ""
            } ${menuVisible ? project.active : ""}`}
            onClick={handleMenuVisible}
          >
            <span className={project.toggle}></span>
            <span className={project.toggle}></span>
            <span className={project.toggle}></span>
          </div>
        </div>
      </div>
      <div className={project.backBut} onClick={() => navigate("/")}></div>
      <div className={project.headerSection}>
        <div className={project.row}>
          <label>{projectData.headerText_1}</label>
        </div>
        <div className={project.image}>
          <img draggable="false" src={maneken} alt="maneken" />
        </div>
        <div className={project.span}>
          <span>{projectData.text_1}</span>
        </div>
      </div>
      <div className={project.descriptionSection}>
        <div>
          <label>{projectData.headerText_2_bigger}</label>
          <span>{projectData.headerText_2_smaller}</span>
        </div>
        <div className={project.details}>
          <article>{projectData.articleOfList}</article>
          <div className={project.listFlex}>
            <p>{projectData.textOfList_1}</p>
            <p>{projectData.textOfList_2}</p>
          </div>
        </div>
        <div className={project.gifRow}>
          <img draggable="false" src={skate} alt="skate" />
          <img draggable="false" src={mouth} alt="mouth" />
        </div>
        <div className={project.fullVideo}>
          <div className={project.headerVideo}>
            <div
              className={
                !isGifPlaying
                  ? project.playButton
                  : `${project.playButton} ${project.hidden}`
              }
              onClick={togglePlay}
            >
              <span className={project.buttonNext}>&#129170;</span>
            </div>
            <video
              id="video"
              loop
              muted
              className={
                isGifPlaying
                  ? project.Video
                  : `${project.Video} ${project.paused}`
              }
              ref={videoRef}
              onClick={togglePlay}
            >
              <source src={HVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
      <div className={project.contactBlock}>
        {!isMobileContact && (
          <div className={project.container__contact}>
            <h1 id="Contacts">Contacts</h1>
          </div>
        )}
        <div className={project.cardGrid}>
          {!isMobileContact && (
            <>
              <div className={project.socialContainer}>
                <div>
                  <div className={`${project.socialCard} ${project.active}`}>
                    <div className={project.image}>
                      <img
                        src={facebook}
                        width={50}
                        height={50}
                        alt="facebook"
                      />
                    </div>
                  </div>
                  <div className={project.title}>Facebook</div>
                </div>
                <div>
                  <div className={`${project.socialCard} ${project.active}`}>
                    <div className={project.image}>
                      <img
                        src={telegram}
                        width={70}
                        height={70}
                        alt="facebook"
                      />
                    </div>
                  </div>
                  <div className={project.title}>Telegram</div>
                </div>
                <div>
                  <div className={`${project.socialCard} ${project.active}`}>
                    <div className={project.image}>
                      <img
                        src={instagram}
                        width={70}
                        height={70}
                        alt="facebook"
                      />
                    </div>
                  </div>
                  <div className={project.title}>Instagram</div>
                </div>
                <div>
                  <div className={`${project.socialCard} ${project.active}`}>
                    <div className={project.image}>
                      <img
                        src={whatsapp}
                        width={70}
                        height={70}
                        alt="facebook"
                      />
                    </div>
                  </div>
                  <div className={project.title}>WhatsApp</div>
                </div>
              </div>
              <div className={project.sideMail}>
                <div className={project.socialCard}>
                  <div className={project.mailBlank}>
                    <div className={project.mailTile}>Mail</div>
                    <div className={project.mailInf}>
                      Astap.dedign@gmail.com
                    </div>
                    <div className={project.title}>
                      If you have a general or project enquiry, please drop me
                      an email or fill the form — available now.
                    </div>
                  </div>
                  <div className={project.fieldBox}>
                    <div className={project.fieldElem}>
                      <Search placeholder="Name" />
                    </div>
                    <div className={project.fieldElem}>
                      <Search placeholder="Email address" />
                    </div>
                    <div className={project.fieldElem}>
                      <Search placeholder="Budget range" />
                    </div>
                    <div className={project.fieldElem}>
                      <Search placeholder="Website link" />
                    </div>
                    <div className={project.fieldElem}>
                      <textarea
                        placeholder="Project details"
                        className={project.textArea}
                      />
                      <div className={project.image} onClick={handleImageClick}>
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
                        <div className={project.selectedFiles}>
                          {selectedFiles.map((file, index) => (
                            <div className={project.fileName}>
                              <label key={index}>{file.name}</label>
                              <div
                                className={project.cancelButton}
                                onClick={() => deleteFiles(index)}
                              >
                                <span className={project.cancel}></span>
                                <span className={project.cancel}></span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className={project.button}>
                      <p>Send Message</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          {isMobileContact && (
            <div className={project.cardGridMobile}>
              <div className={project.socialContainerMobile}>
                <div className={`${project.socialCard} ${project.active}`}>
                  <div className={project.image}>
                    <img src={facebook} width={50} height={50} alt="facebook" />
                  </div>
                  <div className={project.title}>Facebook</div>
                </div>
                <div className={`${project.socialCard} ${project.active}`}>
                  <div className={project.image}>
                    <img src={telegram} width={70} height={70} alt="facebook" />
                  </div>
                  <div className={project.title}>Telegram</div>
                </div>
                <div className={`${project.socialCard} ${project.active}`}>
                  <div className={project.image}>
                    <img
                      src={instagram}
                      width={70}
                      height={70}
                      alt="facebook"
                    />
                  </div>
                  <div className={project.title}>Instagram</div>
                </div>
                <div className={`${project.socialCard} ${project.active}`}>
                  <div className={project.image}>
                    <img src={whatsapp} width={70} height={70} alt="facebook" />
                  </div>
                  <div className={project.title}>WhatsApp</div>
                </div>
                <Link
                  to={`/Contact`}
                  className={`${project.socialCard} ${project.active}`}
                >
                  <div className={project.image}>
                    <img src={mail} width={70} height={70} alt="facebook" />
                  </div>
                  <div className={project.title}>mail</div>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <footer className={footer.bodyFooter}>
        <footer className={footer.containerFooter}>
          <div className={footer.contentFooter}>
            <span>OffScreen</span>
          </div>
        </footer>
      </footer>
    </div>
  );
};

export default ProjectPage;
