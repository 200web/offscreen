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
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedVideo } from "@cloudinary/react";
import { setIsLoaded } from "../Redux/introSlice";
import { CloudinaryVideoPlayer } from "cloudinary-core";
import cloudinary from "cloudinary-video-player";
import "cloudinary-video-player/cld-video-player.min.css";
import { useDispatch } from "react-redux";
import axios from "axios";
import FooterContact from "../components/FooterContact";

const ProjectPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isGifPlaying, setIsGifPlaying] = React.useState(false);
  const [video, setVideo] = React.useState("");
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
  const cld = new Cloudinary({
    cloud: { cloudName: "drk91eyfp" },
  });

  React.useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchCards() {
      try {
        const { data } = await axios.get(
          `https://66e82c2db17821a9d9dbada4.mockapi.io/PageContent/?id=` + id
        );

        const cloudinaryVideo = cld.video(data[0].video);
        setVideo(cloudinaryVideo);

        setProjectData(data[0]);
        console.log(data[0]);
      } catch (error) {
        console.log(error);
      }
    }

    // if (videoElem) {
    //   const player = cloudinary.videoPlayer(videoElem, {
    //     cloudName: "drk91eyfp",
    //     hideContextMenu: true,
    //     showLogo: false,
    //     colors: {
    //       base: "#FDFDFD",
    //       accent: "#93999C",
    //     },
    //     controlBar: {
    //       volumePanel: false,
    //       fullscreenToggle: false,
    //     },
    //   });
    //   player.source("HVideo");
    // }

    fetchCards();
  }, []);

  // const togglePlay = () => {
  //   const videoElem = videoRef.current;

  //   if (!videoElem) return;

  //   if (isGifPlaying) {
  //     videoElem.pause();
  //   } else {
  //     videoElem.play();
  //   }

  //   setIsGifPlaying(!isGifPlaying);
  // };

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
    const videoElem = videoRef.current?.videoRef?.current;
    if (videoElem) {
      videoElem.addEventListener("pause", () => setIsGifPlaying(false));
      videoElem.addEventListener("play", () => setIsGifPlaying(true));
    }
    return () => {
      if (videoElem) {
        videoElem.removeEventListener("pause", () => setIsGifPlaying(false));
        videoElem.removeEventListener("play", () => setIsGifPlaying(true));
      }
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
        <div className={project.headerContent}>
          <div className={project.titleSide}>
            <span
              onClick={() => {
                navigate("/");
                window.scrollTo(0, 0);
              }}
            >
              OffScreen
            </span>
          </div>
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
        </div>
      </div>
      <div className={project.backBut} onClick={() => navigate("/")}></div>
      <div className={project.headerSection}>
        <div className={project.row}>
          <label>{projectData.headerText_1}</label>
        </div>
        <div className={project.image}>
          <img
            draggable="false"
            src={projectData.headerPhoto}
            alt="headerPhoto"
          />
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
          <img draggable="false" src={projectData.photo_1} alt="skate" />
          <img draggable="false" src={projectData.photo_2} alt="mouth" />
        </div>
        <div className={project.fullVideo}>
          <div className={project.headerVideo}>
            {/* <div
              className={
                !isGifPlaying
                  ? project.playButton
                  : `${project.playButton} ${project.hidden}`
              }
              onClick={togglePlay}
            >
              <span className={project.buttonNext}>
                <img draggable="false" src={playBut} />
              </span>
            </div> */}
            <AdvancedVideo
              cldVid={video}
              controls
              loop
              className={project.Video}
              innerRef={videoRef}
            />
          </div>
        </div>
      </div>
      {/* Прошлая версия, без рефакторинга */}
      {/* <div className={project.contactBlock}>
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
      </div> */}
      {!isMobileContact && <FooterContact />}
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
                <img src={instagram} width={70} height={70} alt="facebook" />
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
