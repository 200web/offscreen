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

const TeamCardPresentation_2 = ({ images }) => {
  const cardContainerRef = useRef(null);
  const videoRef = useRef();

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
      role: "Founder",
      profession: "Director and director of editing",
      image: paul,
    },
    {
      id: 2,
      name: "Dmitry Shabaldin",
      role: "CO_Founder",
      profession: "Producer",
      image: dmitrop,
    },
    {
      id: 3,
      name: "Dmitry Astap",
      role: "Marketing Director",
      profession: "Marketing Consultant",
      image: dmitrmark,
    },
    {
      id: 4,
      name: "Egor Efimov",
      role: "Technical Director",
      profession: "Cinematographer",
      image: egor,
    },
    {
      id: 5,
      name: "Jonny Symmetry",
      role: "Designer",
      profession: "VFX artist",
      image: jonny,
    },
    {
      id: 6,
      name: "Andrei Iofe Mdivani",
      role: "Client Manager",
      profession: "Gaffer",
      image: drew,
    },
    {
      id: 7,
      name: "Valiantsin Hlushko",
      role: "Cinematographer",
      profession: "Cinematographer",
      image: valik,
    },
  ];

  React.useEffect(() => {
    const video = videoRef.current;
    video.play();
  }, []);

  return (
    <div className={appStyles.team_card_presentation}>
      <button
        className={`${appStyles.nav_button} ${appStyles.left}`}
        onClick={() => scrollCards("left")}
      >
        <img draggable="false" src={arrow} />
      </button>

      <div className={appStyles.card_container} ref={cardContainerRef}>
        {teamMembers.map((member) => (
          <div className={appStyles.team_card} key={member.id}>
            <video
              src={member.image}
              className={appStyles.team_image}
              muted
              autoPlay
              loop
              playsInline
              ref={videoRef}
            />
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
          draggable="false"
          src={arrow}
          style={{ transform: "rotate(180deg)" }}
        />
      </button>
    </div>
  );
};

export default TeamCardPresentation_2;
