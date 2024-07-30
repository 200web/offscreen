import React from "react";
import footer from "../scss/components/footer.module.scss";
import logo from "../assets/img/logosvg.svg";

const Footer = () => {
  return (
    <footer className={footer.bodyFooter}>
      <footer className={footer.containerFooter}>
        <div className={footer.contentFooter}>
          <span>OffScreen</span>
        </div>
      </footer>
    </footer>
  );
};

export default Footer;
