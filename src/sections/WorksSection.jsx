import React from "react";
import appStyles from "../scss/app.module.scss";
import arrow from "../assets/img/Arrow.png";
import bill from "../assets/img/bill.webp";
import party from "../assets/img/party.webp";
import dance from "../assets/img/dance.webp";
import strawberry from "../assets/img/strawberry.webp";
import adCard from "../assets/img/addCard.webp";
import adCardMobile from "../assets/img/addCardMobile.webp";
import WorkCardElement from "../components/WorkCardElement";
import { Link } from "react-router-dom";

const photos = [bill, party, dance, strawberry];

const WorksSection = () => {
  const [currentPhoto, setCurrentPhoto] = React.useState(bill);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [scrollTop, setScrollTop] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 860);
  const [activeCard, setIsActiveCard] = React.useState(0);
  const myRef = React.useRef();
  const [isVisible, setIsVisible] = React.useState(false);

  const handleChangeImage = (index) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentPhoto(photos[index]);
      setIsAnimating(false);
    }, 300);
  };

  const handleMoveOver = (id) => {
    if (id === activeCard) {
      setIsActiveCard(null);
    } else setIsActiveCard(id);
  };

  const handleMoveLeave = () => {
    setIsActiveCard(null);
  };

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 860);
    };
    const handleScroll = () => {
      setScrollTop(window.scrollY);
      document.body.style.setProperty("--scrollTop", `${window.scrollY}px`);
      document.body.style.setProperty(
        "--TempscrollTop",
        `${3068 - window.scrollY}px`
      );
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isScrolling = window.scrollY < 3068 || window.scrollY > 3700;

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(myRef.current);
  }, []);

  return (
    <section className={appStyles.section}>
      <div className={appStyles.Row}>
        <div
          className={`${appStyles.centralTitle} ${
            isScrolling ? appStyles.scrolling : appStyles.scrollingStop
          }`}
        >
          <span>OUR WORKS</span>
        </div>
      </div>
      <WorkCardElement />
      <div className={appStyles.Row} id="services">
        <div className={appStyles.scrolling_text}>
          <div className={appStyles.text}>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
          </div>
          <div className={appStyles.text}>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
          </div>
        </div>
      </div>
      <div className={appStyles.infoBlock}>
        <div className={appStyles.infoButtons}>
          <div
            className={`${appStyles.button} ${
              activeCard === 1 ? appStyles.active : ""
            }`}
            {...(!isMobile && {
              onMouseEnter: () => {
                handleChangeImage(1);
                handleMoveOver(1);
              },
            })}
            {...(!isMobile && { onMouseLeave: handleMoveLeave })}
            {...(isMobile && { onClick: () => handleMoveOver(1) })}
          >
            <div className={appStyles.buttonHeader}>
              <span>Music Videos</span>
              <div>
                <img draggable="false" src={arrow} alt="arrow" />
              </div>
            </div>
            <div className={appStyles.buttonDescription}>
              Music videos should amplify the artist's message with stunning
              visuals. We combine creativity and innovation to transform your
              music into captivating art.
            </div>
          </div>
          <div
            className={`${appStyles.button} ${
              activeCard === 2 ? appStyles.active : ""
            }`}
            {...(!isMobile && {
              onMouseEnter: () => {
                handleChangeImage(0);
                handleMoveOver(2);
              },
            })}
            {...(!isMobile && { onMouseLeave: handleMoveLeave })}
            {...(isMobile && { onClick: () => handleMoveOver(2) })}
          >
            <div className={appStyles.buttonHeader}>
              <span>Commercials</span>
              <div>
                <img draggable="false" src={arrow} alt="arrow" />
              </div>
            </div>
            <div className={appStyles.buttonDescription}>
              Impactful commercials are meant to captivate and inspire action,
              elevating your brand through powerful storytelling. We have great
              expertise in turning ideas into memorable visual narratives.
            </div>
          </div>
          <div
            className={`${appStyles.button} ${
              activeCard === 3 ? appStyles.active : ""
            }`}
            {...(!isMobile && {
              onMouseEnter: () => {
                handleChangeImage(2);
                handleMoveOver(3);
              },
            })}
            {...(!isMobile && { onMouseLeave: handleMoveLeave })}
            {...(isMobile && { onClick: () => handleMoveOver(3) })}
          >
            <div className={appStyles.buttonHeader}>
              <span>Event Videos</span>
              <div>
                <img draggable="false" src={arrow} alt="arrow" />
              </div>
            </div>
            <div className={appStyles.buttonDescription}>
              By capturing the essence and emotions of your events, we create
              dynamic and unforgettable videos. Let us turn your event into a
              lasting memory.
            </div>
          </div>
          <div
            className={`${appStyles.button} ${
              activeCard === 4 ? appStyles.active : ""
            }`}
            {...(!isMobile && {
              onMouseEnter: () => {
                handleChangeImage(3);
                handleMoveOver(4);
              },
            })}
            {...(!isMobile && { onMouseLeave: handleMoveLeave })}
            {...(isMobile && { onClick: () => handleMoveOver(4) })}
          >
            <div className={appStyles.buttonHeader}>
              <span>Product Videos</span>
              <div>
                <img draggable="false" src={arrow} alt="arrow" />
              </div>
            </div>
            <div className={appStyles.buttonDescription}>
              Highlighting the best of your product, our videos inform and
              inspire potential customers. Rely on us to make your product stand
              out.
            </div>
          </div>
        </div>
        <div className={appStyles.presentation}>
          <img
            draggable="false"
            src={currentPhoto}
            alt="presentation"
            className={isAnimating ? appStyles.fadeOut : appStyles.fadeIn}
          />
        </div>
      </div>
      <div className={appStyles.Row}>
        <div className={appStyles.scrolling_text}>
          <div className={appStyles.text}>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
          </div>
          <div className={appStyles.text}>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
            <span>Services</span>
          </div>
        </div>
      </div>
      <div className={appStyles.adCardBlock} ref={myRef}>
        <div
          className={`${appStyles.adCardContent} ${
            isVisible ? appStyles.active : ""
          }`}
        >
          <img
            draggable="false"
            src={isMobile ? adCardMobile : adCard}
            alt="card"
          />
          <div
            className={`${appStyles.adCardDescription} ${
              isMobile ? appStyles.mobile : ""
            }`}
          >
            <div
              className={`${appStyles.text} ${
                isMobile ? appStyles.mobile : ""
              }`}
            >
              Our free consultation will help you explore your project's
              potential and discover how we can transform your ideas into
              impactful visual stories.
            </div>
            <div
              className={`${appStyles.button} ${
                isMobile ? appStyles.mobile : ""
              }`}
            >
              <div>
                <Link to={`/Contact`} className={appStyles.contactButton}>
                  <span>GET IN TOUCH</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={appStyles.Row} id="Team">
        <div className={appStyles.scrolling_text}>
          <div className={appStyles.text}>
            <span>Team</span>
            <span>Team</span>
            <span>Team</span>
            <span>Team</span>
            <span>Team</span>
            <span>Team</span>
            <span>Team</span>
            <span>Team</span>
            <span>Team</span>
            <span>Team</span>
            <span>Team</span>
            <span>Team</span>
            <span>Team</span>
            <span>Team</span>
            <span>Team</span>
            <span>Team</span>
            <span>Team</span>
            <span>Team</span>
            <span>Team</span>
            <span>Team</span>
            <span>Team</span>
            <span>Team</span>
            <span>Team</span>
            <span>Team</span>
            <span>Team</span>
          </div>
          <div className={appStyles.text}>
            <span>Team</span>
            <span>Team</span>
            <span>Team</span>
            <span>Team</span>
            <span>Team</span>
            <span>Team</span>
            <span>Team</span>
            <span>Team</span>
            <span>Team</span>
            <span>Team</span>
            <span>Team</span>
            <span>Team</span>
            <span>Team</span>
            <span>Team</span>
            <span>Team</span>
            <span>Team</span>
            <span>Team</span>
            <span>Team</span>
            <span>Team</span>
            <span>Team</span>
            <span>Team</span>
            <span>Team</span>
            <span>Team</span>
            <span>Team</span>
            <span>Team</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorksSection;
