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

const AdvantageSection = () => {
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

      </div>

      
      <div className={appStyles.Row}>
        <div className={appStyles.centralTitle}>
          <h1 className={appStyles.advTitle}>Our Key Advantages</h1>
        </div>
      </div>
      <div className={appStyles.advantageRow}>
        <div className={appStyles.advantageContent}>
          <div className={appStyles.advantageCard}>
            <div className={appStyles.blurBlock}></div>
            <div className={appStyles.cardImageSpecial}>
              <img loading="lazy" draggable="false" src={rupor} alt="pointer" />
            </div>
            <div className={appStyles.textContent}>
              <div>
                <h4>Experience</h4>
              </div>
              <div>
                <span>Deep understanding of branding and advertising.</span>
              </div>
            </div>
          </div>
          <div className={appStyles.advantageCard}>
            <div className={appStyles.blurBlock}></div>
            <div className={appStyles.cardImageSpecial}>
              <img loading="lazy" src={notes} alt="pointer" />
            </div>
            <div className={appStyles.textContent}>
              <div>
                <h4>Quickly</h4>
              </div>
              <div>
                <span>Optimal solutions for achieving the best quality.</span>
              </div>
            </div>
          </div>
          <div
            className={`${appStyles.advantageCard} ${
              boxVisible[2] && appStyles.active
            }`}
          >
            <div className={appStyles.cardImageSpecial2}>
              <img loading="lazy" src={security} alt="pointer" />
            </div>
            <div className={appStyles.textContent}>
              <div>
                <h4>Reliability</h4>
              </div>
              <div>
                <span>Quality assurance and adherence to deadlines.</span>
              </div>
            </div>
          </div>
          <div className={appStyles.advantageCard}>
            <div className={appStyles.blurBlock}></div>
            <div className={appStyles.cardImage}>
              <img loading="lazy" src={baby} alt="pointer" />
            </div>
            <div className={appStyles.textContent}>
              <div>
                <h4>Understanding</h4>
              </div>
              <div>
                <span>Individual approach to each client.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvantageSection;
