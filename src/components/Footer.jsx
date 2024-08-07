import React from "react";
import footer from "../scss/components/footer.module.scss";
import logo from "../assets/img/logosvg.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={footer.bodyFooter}>
      <footer className={footer.containerFooter}>
        <div className={footer.contentFooter}>
          <main>
            <div>
              <span>Copyright, 2024</span>
            </div>
            <span className={footer.web}>
              web: <a href="https://t.me/tsyhankovah">@tsyhankovah</a>
            </span>
          </main>
          {/* <label className={footer.policy}>
            <Link to="/policy">
              <span>Политика Конфиденциальности</span>
            </Link>
          </label> */}
        </div>
      </footer>
    </footer>
  );
};

export default Footer;
