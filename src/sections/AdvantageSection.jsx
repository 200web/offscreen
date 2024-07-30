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
  return (
    <section className={appStyles.section}>
      <div className={appStyles.Row}>
        <div className={appStyles.title}>
          <h1>OFFSCREEN</h1>
        </div>
      </div>
      <div className={appStyles.content}>
        <div className={appStyles.introCard}>
          <div className={appStyles.headerContent}>
            <div className={appStyles.imgBox}>
              <img draggable="false" src={packa} alt="pointer" />
            </div>
          </div>
          <div className={appStyles.textContent}>
            <span>
              We believe in the power of stories that inspire, educate, and
              entertain.
            </span>
          </div>
        </div>
        <div className={appStyles.introCard}>
          <div className={appStyles.headerContent}>
            <div className={appStyles.imgBoxSpecial}>
              <img draggable="false" src={tick} alt="pointer" />
            </div>
          </div>
          <div className={appStyles.textContent}>
            <span>
              At <b>offscreen</b> every project starts with a unique idea,
              transforming into a captivating visual narrative that can impact
              the audience and leave a lasting impression in their memory.
            </span>
          </div>
        </div>
        <div className={appStyles.activeCard}>
          <div className={appStyles.cardImage}>
            <img draggable="false" src={caset} alt="pointer" />
          </div>
          <Link to={`/Contact`} className={appStyles.contactButton}>
            <div className={appStyles.activeButton}>Get in touch</div>
            <div className={appStyles.hiddenButton}>Get in touch</div>
          </Link>
        </div>
      </div>
      <div className={appStyles.Row}>
        <div className={appStyles.centralTitle}>
          <h1>Our Key Advantages</h1>
        </div>
      </div>
      <div className={appStyles.advantageRow}>
        <div className={appStyles.advantageContent}>
          <div className={appStyles.advantageCard}>
            <div className={appStyles.blurBlock}></div>
            <div className={appStyles.cardImageSpecial}>
              <img draggable="false" src={rupor} alt="pointer" />
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
              <img src={notes} alt="pointer" />
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
          <div className={appStyles.advantageCard}>
            <div className={appStyles.cardImageSpecial2}>
              <img src={security} alt="pointer" />
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
              <img src={baby} alt="pointer" />
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
