import React from "react";
import appStyles from "../scss/app.module.scss";

const FaqButton = ({
  index,
  activeCard,
  isMobile,
  handleMoveOver,
  handleMoveLeave,
  question,
  answer,
}) => {
  return (
    <div
      className={`${appStyles.button} ${
        activeCard === index ? appStyles.active : ""
      }`}
      {...(!isMobile && {
        onMouseEnter: () => handleMoveOver(index),
      })}
      {...(!isMobile && { onMouseLeave: handleMoveLeave })}
      {...(isMobile && { onClick: () => handleMoveOver(index) })}
    >
      <div className={appStyles.buttonHeader}>
        <span>{question}</span>
        <div>
          <span className={appStyles.toggle}></span>
          <span className={appStyles.toggle}></span>
        </div>
      </div>
      <div className={appStyles.buttonDescription}>{answer}</div>
    </div>
  );
};

export default FaqButton;
