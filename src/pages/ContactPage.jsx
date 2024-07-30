import React from "react";
import { Routes, Route } from "react-router-dom";
import contactStyles from "../scss/contactPage.module.scss";
import cube from "../assets/img/cube.png";
import dollars from "../assets/img/dollars.png";
import clock from "../assets/img/clock.png";
import ContactCard from "../components/ContactCard";
import ContactMail from "../components/ContactMail";

const ContactPage = () => {
  const [isClicked, setIsClicked] = React.useState(false);
  const images = [cube, dollars, clock];
  const buttonText = [
    [
      "Music videos",
      "Commercials",
      "Corporate/product videos",
      "Event videos",
      "Other",
    ],
    [
      "To gain a new customers / audience",
      "To present a new product / service / song",
      "Brand / promotional video",
      "Entertaining content",
      "Other",
    ],
    ["<1000 $", "1000$ - 5000$", "5000$ - 10000$", "10000$ - 50000$", "Other"],
    ["Yesterday", "A couple of days", "Week", "Month", "Other"],
  ];
  const headerText = [
    "What type of video do you need?",
    "Your goals?",
    "Your approximate budget?",
    "What is the deadline?",
  ];

  return (
    <section className={contactStyles.section}>
      <ContactCard
        images={images}
        buttonText={buttonText}
        headerText={headerText}
        setIsClicked={setIsClicked}
        isClicked={isClicked}
      />
      <ContactMail isClicked={isClicked} setIsClicked={setIsClicked} />
    </section>
  );
};

export default ContactPage;
