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
          <div
            className={`${appStyles.button} ${
              activeCard === 1 ? appStyles.active : ""
            }`}
            {...(!isMobile && {
              onMouseEnter: () => {
                handleMoveOver(1);
              },
            })}
            {...(!isMobile && { onMouseLeave: handleMoveLeave })}
            {...(isMobile && { onClick: () => handleMoveOver(1) })}
          >
            <div className={appStyles.buttonHeader}>
              <span>
                What is the process of working with your studio from start to
                finish?
              </span>
              <div>
                <span className={appStyles.toggle}></span>
                <span className={appStyles.toggle}></span>
              </div>
            </div>
            <div className={appStyles.buttonDescription}>
              Our work begins with discussing your idea. Then, we develop a
              concept, create a budget, conduct the shooting period, and
              complete the project during post-production.
            </div>
          </div>
          <div
            className={`${appStyles.button} ${
              activeCard === 2 ? appStyles.active : ""
            }`}
            {...(!isMobile && {
              onMouseEnter: () => {
                handleMoveOver(2);
              },
            })}
            {...(!isMobile && { onMouseLeave: handleMoveLeave })}
            {...(isMobile && { onClick: () => handleMoveOver(2) })}
          >
            <div className={appStyles.buttonHeader}>
              <span>
                What do I need to do to start working with your studio?
              </span>
              <div>
                <span className={appStyles.toggle}></span>
                <span className={appStyles.toggle}></span>
              </div>
            </div>
            <div className={appStyles.buttonDescription}>
              You need to contact us and present your idea. We will discuss your
              goals and requirements to better understand how we can assist you.
            </div>
          </div>
          <div
            className={`${appStyles.button} ${
              activeCard === 3 ? appStyles.active : ""
            }`}
            {...(!isMobile && {
              onMouseEnter: () => {
                handleMoveOver(3);
              },
            })}
            {...(!isMobile && { onMouseLeave: handleMoveLeave })}
            {...(isMobile && { onClick: () => handleMoveOver(3) })}
          >
            <div className={appStyles.buttonHeader}>
              <span>
                How does the idea and concept development process work?
              </span>
              <div>
                <span className={appStyles.toggle}></span>
                <span className={appStyles.toggle}></span>
              </div>
            </div>
            <div className={appStyles.buttonDescription}>
              We conduct a series of meetings and discussions with you to
              clearly understand your idea. Then, we develop a concept that
              reflects your vision and meets your goals.
            </div>
          </div>
          <div
            className={`${appStyles.button} ${
              activeCard === 4 ? appStyles.active : ""
            }`}
            {...(!isMobile && {
              onMouseEnter: () => {
                handleMoveOver(4);
              },
            })}
            {...(!isMobile && { onMouseLeave: handleMoveLeave })}
            {...(isMobile && { onClick: () => handleMoveOver(4) })}
          >
            <div className={appStyles.buttonHeader}>
              <span>How is the project budget formed?</span>
              <div>
                <span className={appStyles.toggle}></span>
                <span className={appStyles.toggle}></span>
              </div>
            </div>
            <div className={appStyles.buttonDescription}>
              After developing the concept, we create a detailed budget that
              considers all aspects of the project, including the shooting
              period, equipment, team, and post-production.
            </div>
          </div>
          <div
            className={`${appStyles.button} ${
              activeCard === 5 ? appStyles.active : ""
            }`}
            {...(!isMobile && {
              onMouseEnter: () => {
                handleMoveOver(5);
              },
            })}
            {...(!isMobile && { onMouseLeave: handleMoveLeave })}
            {...(isMobile && { onClick: () => handleMoveOver(5) })}
          >
            <div className={appStyles.buttonHeader}>
              <span>How long does the shooting period last?</span>
              <div>
                <span className={appStyles.toggle}></span>
                <span className={appStyles.toggle}></span>
              </div>
            </div>
            <div className={appStyles.buttonDescription}>
              The shooting period usually takes one day, but depending on the
              complexity of the project, it may last two days or more.
            </div>
          </div>
          <div
            className={`${appStyles.button} ${
              activeCard === 6 ? appStyles.active : ""
            }`}
            {...(!isMobile && {
              onMouseEnter: () => {
                handleMoveOver(6);
              },
            })}
            {...(!isMobile && { onMouseLeave: handleMoveLeave })}
            {...(isMobile && { onClick: () => handleMoveOver(6) })}
          >
            <div className={appStyles.buttonHeader}>
              <span>What are the timelines for the final video?</span>
              <div>
                <span className={appStyles.toggle}></span>
                <span className={appStyles.toggle}></span>
              </div>
            </div>
            <div className={appStyles.buttonDescription}>
              The timeline depends on the complexity of the project. It can
              range from three days to two weeks. We always strive to meet the
              agreed deadlines.
            </div>
          </div>
          <div
            className={`${appStyles.button} ${
              activeCard === 7 ? appStyles.active : ""
            }`}
            {...(!isMobile && {
              onMouseEnter: () => {
                handleMoveOver(7);
              },
            })}
            {...(!isMobile && { onMouseLeave: handleMoveLeave })}
            {...(isMobile && { onClick: () => handleMoveOver(7) })}
          >
            <div className={appStyles.buttonHeader}>
              <span>What does the post-production stage include?</span>
              <div>
                <span className={appStyles.toggle}></span>
                <span className={appStyles.toggle}></span>
              </div>
            </div>
            <div className={appStyles.buttonDescription}>
              Post-production includes video editing, color correction, adding
              graphics and special effects, as well as the final review and
              approval of the video.
            </div>
          </div>
          <div
            className={`${appStyles.button} ${
              activeCard === 8 ? appStyles.active : ""
            }`}
            {...(!isMobile && {
              onMouseEnter: () => {
                handleMoveOver(8);
              },
            })}
            {...(!isMobile && { onMouseLeave: handleMoveLeave })}
            {...(isMobile && { onClick: () => handleMoveOver(8) })}
          >
            <div className={appStyles.buttonHeader}>
              <span>Can changes be made after the shooting is complete?</span>
              <div>
                <span className={appStyles.toggle}></span>
                <span className={appStyles.toggle}></span>
              </div>
            </div>
            <div className={appStyles.buttonDescription}>
              Yes, changes can be made during the post-production stage. We will
              discuss your requests and do our best to make the necessary
              adjustments.
            </div>
          </div>
          <div
            className={`${appStyles.button} ${
              activeCard === 9 ? appStyles.active : ""
            }`}
            {...(!isMobile && {
              onMouseEnter: () => {
                handleMoveOver(9);
              },
            })}
            {...(!isMobile && { onMouseLeave: handleMoveLeave })}
            {...(isMobile && { onClick: () => handleMoveOver(9) })}
          >
            <div className={appStyles.buttonHeader}>
              <span>How do you ensure the quality of the final product?</span>
              <div>
                <span className={appStyles.toggle}></span>
                <span className={appStyles.toggle}></span>
              </div>
            </div>
            <div className={appStyles.buttonDescription}>
              We use modern equipment and the latest technologies, and we have a
              team of professionals with extensive experience in video
              production. All stages of production are carefully controlled to
              ensure high quality.
            </div>
          </div>
          <div
            className={`${appStyles.button} ${
              activeCard === 10 ? appStyles.active : ""
            }`}
            {...(!isMobile && {
              onMouseEnter: () => {
                handleMoveOver(10);
              },
            })}
            {...(!isMobile && { onMouseLeave: handleMoveLeave })}
            {...(isMobile && { onClick: () => handleMoveOver(10) })}
          >
            <div className={appStyles.buttonHeader}>
              <span>What services are included in the project cost?</span>
              <div>
                <span className={appStyles.toggle}></span>
                <span className={appStyles.toggle}></span>
              </div>
            </div>
            <div className={appStyles.buttonDescription}>
              The project cost typically includes concept development, the
              shooting period, equipment rental, team work, and post-production.
              Additional services are discussed separately.
            </div>
          </div>
          <div
            className={`${appStyles.button} ${
              activeCard === 11 ? appStyles.active : ""
            }`}
            {...(!isMobile && {
              onMouseEnter: () => {
                handleMoveOver(11);
              },
            })}
            {...(!isMobile && { onMouseLeave: handleMoveLeave })}
            {...(isMobile && { onClick: () => handleMoveOver(11) })}
          >
            <div className={appStyles.buttonHeader}>
              <span>What are your payment terms?</span>
              <div>
                <span className={appStyles.toggle}></span>
                <span className={appStyles.toggle}></span>
              </div>
            </div>
            <div className={appStyles.buttonDescription}>
              Payment terms are discussed individually with each client.
              Typically, we work with an advance payment followed by the
              remaining payment after the project is completed.
            </div>
          </div>
          <div
            className={`${appStyles.button} ${
              activeCard === 12 ? appStyles.active : ""
            }`}
            {...(!isMobile && {
              onMouseEnter: () => {
                handleMoveOver(12);
              },
            })}
            {...(!isMobile && { onMouseLeave: handleMoveLeave })}
            {...(isMobile && { onClick: () => handleMoveOver(12) })}
          >
            <div className={appStyles.buttonHeader}>
              <span>Can you help with promoting the finished video?</span>
              <div>
                <span className={appStyles.toggle}></span>
                <span className={appStyles.toggle}></span>
              </div>
            </div>
            <div className={appStyles.buttonDescription}>
              Yes, we can offer additional services to promote your video on
              various platforms and social media.
            </div>
          </div>
          <div
            className={`${appStyles.button} ${
              activeCard === 13 ? appStyles.active : ""
            }`}
            {...(!isMobile && {
              onMouseEnter: () => {
                handleMoveOver(13);
              },
            })}
            {...(!isMobile && { onMouseLeave: handleMoveLeave })}
            {...(isMobile && { onClick: () => handleMoveOver(13) })}
          >
            <div className={appStyles.buttonHeader}>
              <span>
                What happens if I’m not satisfied with the final result?
              </span>
              <div>
                <span className={appStyles.toggle}></span>
                <span className={appStyles.toggle}></span>
              </div>
            </div>
            <div className={appStyles.buttonDescription}>
              We always strive to ensure our clients are happy with the result.
              If you are not satisfied, we will work on revisions until you are
              completely satisfied.
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
