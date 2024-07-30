import React from "react";
import styles from "../scss/notFoundPage.module.scss";
import eyes from "../assets/img/eyes.gif";

const NotFound = () => {
  return (
    <section className={styles.section}>
      <div className={styles.contentBox}>
        <div className={styles.description}>
          <label>404 </label>
          <span>Oops</span>
          <p>Something went wrong while displaying this web page.</p>
        </div>
        <div className={styles.image}>
          <img draggable="false" src={eyes} alt="eyes" />
        </div>
      </div>
    </section>
  );
};

export default NotFound;
