import React from "react";
import appStyles from "../scss/app.module.scss";
import paul from "../assets/img/paul.jpg";
import Dmitry from "../assets/img/Dmitry.jpg";
import Andrei from "../assets/img/Andrei.jpg";
import Jonny from "../assets/img/Jonny.jpg";
import Egor from "../assets/img/Egor.jpg";
import CardCarousel from "../components/CardCarousel";
import CardElement from "../components/CardElement";

import light from "../assets/img/REDAPPLE.gif";
import TeamCardPresentation from "../components/TeamCardPresentation";
import { Link } from "react-router-dom";
import FooterContact from "../components/FooterContact";
import FaqButton from "../components/FAQButton";

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
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 860);
  const [isShort, setIsShort] = React.useState(true);
  const [activeCard, setIsActiveCard] = React.useState(0);
  const teamPhotos = [paul, Dmitry, Andrei, Jonny, Egor];

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

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const faqItems = [
    {
      question:
        "What is the process of working with your studio from start to finish?",
      answer:
        "Our work begins with discussing your idea. Then, we develop a concept, create a budget, conduct the shooting period, and complete the project during post-production.",
    },
    {
      question: "What do I need to do to start working with your studio?",
      answer:
        "You need to contact us and present your idea. We will discuss your goals and requirements to better understand how we can assist you.",
    },
    {
      question: "How does the idea and concept development process work?",
      answer:
        "We conduct a series of meetings and discussions with you to clearly understand your idea. Then, we develop a concept that reflects your vision and meets your goals.",
    },
    {
      question: "How is the project budget formed?",
      answer:
        "After developing the concept, we create a detailed budget that considers all aspects of the project, including the shooting period, equipment, team, and post-production.",
    },
    {
      question: "How long does the shooting period last?",
      answer:
        "The shooting period usually takes one day, but depending on the complexity of the project, it may last two days or more.",
    },
    {
      question: "What are the timelines for the final video?",
      answer:
        "The timeline depends on the complexity of the project. It can range from three days to two weeks. We always strive to meet the agreed deadlines.",
    },
    {
      question: "What does the post-production stage include?",
      answer:
        "Post-production includes video editing, color correction, adding graphics and special effects, as well as the final review and approval of the video.",
    },
    {
      question: "Can changes be made after the shooting is complete?",
      answer:
        "Yes, changes can be made during the post-production stage. We will discuss your requests and do our best to make the necessary adjustments.",
    },
    {
      question: "How do you ensure the quality of the final product?",
      answer:
        "We use modern equipment and the latest technologies, and we have a team of professionals with extensive experience in video production. All stages of production are carefully controlled to ensure high quality.",
    },
    {
      question: "What services are included in the project cost?",
      answer:
        "The project cost typically includes concept development, the shooting period, equipment rental, team work, and post-production. Additional services are discussed separately.",
    },
    {
      question: "What are your payment terms?",
      answer:
        "Payment terms are discussed individually with each client. Typically, we work with an advance payment followed by the remaining payment after the project is completed.",
    },
    {
      question: "Can you help with promoting the finished video?",
      answer:
        "Yes, we can offer additional services to promote your video on various platforms and social media.",
    },
    {
      question: "What happens if I’m not satisfied with the final result?",
      answer:
        "We always strive to ensure our clients are happy with the result. If you are not satisfied, we will work on revisions until you are completely satisfied.",
    },
  ];

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
        <div
          className={`${appStyles.fagButtons} ${!isShort && appStyles.full}`}
        >
          {faqItems.map((item, index) => {
            return (
              <FaqButton
                key={index}
                index={index + 1}
                activeCard={activeCard}
                isMobile={isMobile}
                handleMoveOver={handleMoveOver}
                handleMoveLeave={handleMoveLeave}
                question={item.question}
                answer={item.answer}
              />
            );
          })}
        </div>
        <div className={appStyles.buttons}>
          <div className={appStyles.buttonFag}>
            <Link to={`/Contact`} className={appStyles.contactButton}>
              <span>GET IN TOUCH</span>
            </Link>
          </div>
          <div
            className={appStyles.buttonFagShowMore}
            onClick={() => setIsShort(!isShort)}
          >
            <div className={appStyles.contactButton}>
              <span>{isShort ? "Show more" : "Show less"}</span>
            </div>
          </div>
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
