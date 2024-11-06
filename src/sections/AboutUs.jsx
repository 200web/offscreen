import React from "react";
import appStyles from "../scss/app.module.scss";
import caset from "../assets/img/caset.webp";
import tick from "../assets/img/tick.webp";
import packa from "../assets/img/package.png";
import rupor from "../assets/img/rupor.webp";
import notes from "../assets/img/notes.webp";
import security from "../assets/img/security.webp";
import baby from "../assets/img/baby.webp";
import { Link } from "react-router-dom";

const AboutUs = () => {
  const myRef = React.useRef();
  const [isVisible, setIsVisible] = React.useState(false);
  const [boxVisible, setBoxVisible] = React.useState([
    false,
    false,
    false,
    false,
  ]);

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

  React.useEffect(() => {
    if (isVisible) {
      boxVisible.forEach((_, index) => {
        setTimeout(() => {
          setBoxVisible((prev) => {
            const newVisibility = [...prev];
            newVisibility[index] = true;
            return newVisibility;
          });
        }, 200 * index);
      });
    }
  }, [isVisible]);

  return (
    <section className={appStyles.section}>
      {/* <div className={appStyles.Row}>
        <div className={appStyles.title}>
          <h1 className={appStyles.labelTitle}>OFFSCREEN</h1>
        </div>
      </div> */}
      <div
        className={`${appStyles.content} ${isVisible ? appStyles.active : ""}`}
        ref={myRef}
      >
        <div className={appStyles.introCard}>
          <div className={appStyles.headerContent}>
            <div className={appStyles.imgBox}>
              <img loading="lazy" draggable="false" src={packa} alt="pointer" />
            </div>
          </div>
          <div
            className={`${appStyles.textContent} ${
              boxVisible[0] && appStyles.active
            }`}
          >
            <span>
              We believe in the power of stories that inspire, educate, and
              entertain.
            </span>
          </div>
        </div>
        <div className={appStyles.introCard}>
          <div className={appStyles.headerContent}>
            <div className={appStyles.imgBoxSpecial}>
              <img loading="lazy" draggable="false" src={tick} alt="pointer" />
            </div>
          </div>
          <div
            className={`${appStyles.textContent} ${
              boxVisible[1] && appStyles.active
            }`}
          >
            <span>
              At <b>offscreen</b> every project starts with a unique idea,
              transforming into a captivating visual narrative that can impact
              the audience and leave a lasting impression in their memory.
            </span>
          </div>
        </div>
        <div className={appStyles.activeCard}>
          <div
            className={`${appStyles.cardImage} ${
              boxVisible[2] && appStyles.active
            }`}
          >
            <img loading="lazy" draggable="false" src={caset} alt="pointer" />
          </div>
          <Link to={`/Contact`} className={appStyles.contactButton}>
            <div className={appStyles.activeButton}>Get in touch</div>
            <div className={appStyles.hiddenButton}>Get in touch</div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
