import React, { useRef, useState } from "react";
import appStyles from "../scss/app.module.scss";
import paul from "../scss/../assets/img/paul.webm";
import dmitrop from "../scss/../assets/img/dmitrop.webm";
import dmitrmark from "../scss/../assets/img/dmitrmark.webm";
import egor from "../scss/../assets/img/egor.webm";
import jonny from "../scss/../assets/img/jonny.webm";
import valik from "../scss/../assets/img/valik.webm";
import drew from "../scss/../assets/img/drew.webm";
import arrow from "../scss/../assets/img/Arrow.png";
import Egor from "../scss/../assets/img/Egor.webp";
import Dmitry from "../scss/../assets/img/Dmitry.webp";
import Astap from "../scss/../assets/img/Astap.webp";
import Andrei from "../scss/../assets/img/Andrei.webp";
import Paul from "../scss/../assets/img/Paul.webp";
import valin from "../scss/../assets/img/valin.webp";
import Jonhy from "../scss/../assets/img/Jonhy.webp";

const TeamCardPresentation_2 = ({ images }) => {
  const cardContainerRef = useRef(null);
  const videoRefs = useRef([]);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 690);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 690);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const scrollCards = (direction) => {
    const scrollAmount = 330;
    const container = cardContainerRef.current;

    if (direction === "left") {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
  };

  const teamMembers = [
    {
      id: 1,
      name: "Paul Gerassi",
      role: "director",
      profession: "Project Lead & Production Coordinator",
      image: isMobile ? Paul : paul,
    },
    {
      id: 2,
      name: "Dmitry Shabaldin",
      role: "producer",
      profession: "Client Relations & Budget Coordinator",
      image: isMobile ? Dmitry : dmitrop,
    },
    {
      id: 3,
      name: "Dmitry Astap",
      role: "marketer",
      profession: "Marketing Lead & Business Consultant",
      image: isMobile ? Astap : dmitrmark,
    },
    {
      id: 4,
      name: "Egor Efimov",
      role: "cinematographer",
      profession: "Director of Photography & Shoot Coordinator",
      image: isMobile ? Egor : egor,
    },
    {
      id: 5,
      name: "Jonny Symmetry",
      role: "VFX",
      profession: "Motion Designer & Visual Effects Artist",
      image: isMobile ? Jonhy : jonny,
    },
    {
      id: 6,
      name: "Andrei Iofe Mdivani",
      role: "gaffer",
      profession: "Lighting Technician & Camera Operator",
      image: isMobile ? Andrei : drew,
    },
    {
      id: 7,
      name: "Valiantsin Hlushko",
      role: "cinematographer",
      profession: "Director of Photography & Camera Operator",
      image: isMobile ? valin : valik,
    },
  ];

  React.useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting) {
          video.play();
        } else {
          video.pause();
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    videoRefs.current.forEach((video) => {
      if (video) {
        observer.observe(video);
      }
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) {
          observer.unobserve(video);
        }
      });
    };
  }, []);

  return (
    <div className={appStyles.team_card_presentation}>
      <button
        className={`${appStyles.nav_button} ${appStyles.left}`}
        onClick={() => scrollCards("left")}
      >
        <img loading="lazy" draggable="false" src={arrow} />
      </button>

      <div className={appStyles.card_container} ref={cardContainerRef}>
        {teamMembers.map((member, index) => (
          <div className={appStyles.team_card} key={member.id}>
            {isMobile ? (
              <img
                src={member.image}
                draggable="false"
                loading="lazy"
                className={appStyles.team_image}
              />
            ) : (
              <video
                src={member.image}
                className={appStyles.team_image}
                muted
                loop
                playsInline
                ref={(el) => (videoRefs.current[index] = el)}
              />
            )}
            <div className={appStyles.card_info}>
              <p className={appStyles.role}>{member.role}</p>
              <p className={appStyles.profession}>{member.profession}</p>
            </div>
            <span className={appStyles.name}>{member.name}</span>
          </div>
        ))}
      </div>

      <button
        className={`${appStyles.nav_button} ${appStyles.right}`}
        onClick={() => scrollCards("right")}
      >
        <img
          loading="lazy"
          draggable="false"
          src={arrow}
          style={{ transform: "rotate(180deg)" }}
        />
      </button>
    </div>
  );
};

export default TeamCardPresentation_2;
