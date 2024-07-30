import React from "react";
import appStyles from "../scss/app.module.scss";
import chel from "../assets/img/chel.webp";
import anonim from "../assets/img/anonim.webp";
import dima from "../assets/img/dima.webp";
import CardCarousel from "../components/CardCarousel";
import CardElement from "../components/CardElement";

import light from "../assets/img/REDAPPLE.gif";
import TeamCardPresentation from "../components/TeamCardPresentation";
import { Link } from "react-router-dom";
import FooterContact from "../components/FooterContact";

const FooterSection = () => {
  const cards = [
    <div>
      <CardElement
        headerText={"Alina Rizhko (CEO)"}
        descriptionText={[
          "I recently had the pleasure of working with Dmitry, and I must say, he's been the best thing that could have happened to me as someone who decided to take a new step in business and open up a new direction.",
          "The website he designed for me is amazing, but what's truly invaluable is the ongoing support he provides in managing social media and just being there for me whenever I need assistance.",
          "What's even more impressive is that he delivered everything on time, which is a rarity in this industry.",
          "Dmitry, I can't thank you enough! You're simply the best.",
        ]}
      />
    </div>,
    <div>
      <CardElement
        headerText={"Avitology"}
        descriptionText={[
          `Dmitry has supported me with the development of several web pages for business in the field of coffee industry. Each time, he provided a distinct design concept that aligned with the company's vision and mission.`,
          `Furthermore, I would like to mention that:`,
          ` 1. He prioritizes customer satisfaction and is highly attentive to their needs.`,
          ` 2. He adheres to timelines and stays within the agreed-upon budget.`,
          ` 3. He is creative and flexible.`,
        ]}
      />
    </div>,
    <div>
      <CardElement
        headerText={"Konstantyn Sulytski"}
        descriptionText={[
          `I had the pleasure of working with Dmitry on a web design project on the Tilda platform, and I must say that his skills exceeded my expectations. He was able to create a responsive and visually stunning website that perfectly captured the essence of my business.
Dmitry’s attention to detail was impressive, and he was able to incorporate all the technical features that I wanted.`,
          `Throughout the project, Dmitry was communicative, responsive, and always available to address any questions or concerns that I had. His ability to understand my vision and translate it into a tangible product was truly remarkable.`,
        ]}
      />
    </div>,
  ];

  const teamPhotos = [dima, chel, dima, chel, dima, chel, dima, chel, dima];

  return (
    <section className={appStyles.section}>
      <div className={appStyles.teamBlock}>
        <TeamCardPresentation images={teamPhotos} />
      </div>
      <div className={appStyles.fagBlock}>
        <div className={appStyles.headerFag}>FAQ</div>
        <img
          className={appStyles.light}
          draggable="false"
          src={light}
          alt="light"
        />
        <div className={appStyles.fagButtons}>
          <div className={appStyles.button}>
            <div className={appStyles.buttonHeader}>
              <span>What is an estimate?</span>
              <div>
                <span className={appStyles.toggle}></span>
                <span className={appStyles.toggle}></span>
              </div>
            </div>
            <div className={appStyles.buttonDescription}>
              Music videos should amplify the artist's message with stunning
              visuals. We combine creativity and innovation to transform your
              music into captivating art.
            </div>
          </div>
          <div className={appStyles.button}>
            <div className={appStyles.buttonHeader}>
              <span>What deadlines depend on?</span>
              <div>
                <span className={appStyles.toggle}></span>
                <span className={appStyles.toggle}></span>
              </div>
            </div>
            <div className={appStyles.buttonDescription}>
              Impactful commercials are meant to captivate and inspire action,
              elevating your brand through powerful storytelling. We have great
              expertise in turning ideas into memorable visual narratives.
            </div>
          </div>
          <div className={appStyles.button}>
            <div className={appStyles.buttonHeader}>
              <span>What the budget depends on?</span>
              <div>
                <span className={appStyles.toggle}></span>
                <span className={appStyles.toggle}></span>
              </div>
            </div>
            <div className={appStyles.buttonDescription}>
              We believe in the power of stories that inspire, educate, and
              entertain. We believe in the power of stories that inspire,
              educate, and entertain.
            </div>
          </div>
          <div className={appStyles.button}>
            <div className={appStyles.buttonHeader}>
              <span>What contracts?</span>
              <div>
                <span className={appStyles.toggle}></span>
                <span className={appStyles.toggle}></span>
              </div>
            </div>
            <div className={appStyles.buttonDescription}>
              Highlighting the best of your product, our videos inform and
              inspire potential customers. Rely on us to make your product stand
              out.
            </div>
          </div>
        </div>
        <div className={appStyles.buttonFag}>
          <Link to={`/Contact`} className={appStyles.contactButton}>
            <span>GET IN TOUCH</span>
          </Link>
        </div>
      </div>
      <div className={appStyles.reviewBlock}>
        <div className={appStyles.centralTitle}>
          <div className={appStyles.header}>
            <h3>Reviews</h3>
            <span className={appStyles.headerSpan}>
              What Our Clients Say About Us
            </span>
          </div>
          <div className={appStyles.description}>
            <span>
              Our clients and partners are <text>always satisfied</text> with
              our service and the quality of our work.{" "}
              <text>Here's what they have to say about us.</text>
            </span>
          </div>
        </div>
        <CardCarousel cards={cards} />
      </div>
      <FooterContact />
    </section>
  );
};

export default FooterSection;
