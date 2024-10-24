import React from "react";
import appStyles from "../scss/app.module.scss";
import like from "../assets/img/like.webp";

const CardElement = ({ headerText, positionText, descriptionText }) => {
  return (
    <article>
      <div className={appStyles.reviewCardHeader}>
        <div className={appStyles.like}>
          <img loading="lazy" draggable="false" src={like} alt="like" />
        </div>
        <div className={appStyles.name}>
          <span>{headerText}</span>
        </div>
        <div className={appStyles.position}>
          <span>{positionText}</span>
        </div>
      </div>
      <div className={appStyles.reviewDescriptionText}>
        {descriptionText.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </div>
    </article>
  );
};

export default CardElement;
