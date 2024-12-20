import React, { useRef } from "react";
import project from "../scss/projectPage.module.scss";
import footer from "../scss/components/footer.module.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import Search from "../components/Search/Search";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedVideo } from "@cloudinary/react";
import { setIsLoaded } from "../Redux/introSlice";
import { CloudinaryVideoPlayer } from "cloudinary-core";
import cloudinary from "cloudinary-video-player";
import "cloudinary-video-player/cld-video-player.min.css";
import { useDispatch } from "react-redux";
import axios from "axios";
import Header from "../components/Header";
import FooterContact from "../components/FooterContact";
import { setScrollToElement } from "../Redux/scrollSlice";

const ProjectPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isGifPlaying, setIsGifPlaying] = React.useState(false);
  const [video, setVideo] = React.useState("");
  const [projectData, setProjectData] = React.useState([]);
  const [link, setLink] = React.useState("");
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 690);
  const [isMobileContact, setIsMobileContact] = React.useState(
    window.innerWidth <= 900
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
        if (data[0].link) setLink(data[0].link);
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
        <Header />
      </div>
      <div
        className={project.backBut}
        onClick={() => {
          dispatch(setScrollToElement("Our works"));
          navigate("/");
        }}
      ></div>
      <div className={project.headerSection}>
        <div className={project.row}>
          <label>{projectData.headerText_1}</label>
        </div>
        <div className={project.image}>
          <img
            loading="lazy"
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
        {/* <div> */}
        {/* <label>{projectData.headerText_2_bigger}</label> */}
        {/* <span>{projectData.headerText_2_smaller}</span> */}
        {/* </div> */}
        <div className={project.details}>
          <article>{projectData.articleOfList}</article>
          <div className={project.listFlex}>
            <p>{projectData.textOfList_1}</p>
            <p>{projectData.textOfList_2}</p>
          </div>
        </div>
        <div className={project.gifRow}>
          <img
            loading="lazy"
            draggable="false"
            src={projectData.photo_1}
            alt="skate"
          />
          <img
            loading="lazy"
            draggable="false"
            src={projectData.photo_2}
            alt="mouth"
          />
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
                <img loading="lazy" draggable="false" src={playBut} />
              </span>
            </div> */}
            <AdvancedVideo
              cldVid={video}
              controls
              loop
              className={project.Video}
              innerRef={videoRef}
            />
            {link !== "" && (
              <div className={project.originLink}>
                <a className={project.button} href={link}>
                  <div className={project.text}>
                    <span>SEE ORIGINAL</span>
                  </div>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <FooterContact />
    </div>
  );
};

export default ProjectPage;
