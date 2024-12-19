import React from "react";
import footer from "../scss/components/footer.module.scss";
import logo from "../assets/img/logosvg.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={footer.bodyFooter}>
      <div className={footer.containerFooter}>
        <div className={footer.contentFooter}>
          <main className={footer.leftFooter}>
            <div>
              <span>OFFSCREEN PROD.</span> <br />
              <span>Copyright, 2024</span>
              <br />
            </div>
            <span className={footer.web}>
              <br />
              web: <a href="https://t.me/Dmitry_Astap">@Dmitry_Astap</a>
            </span>
          </main>
          <main className={footer.rightFooter}>
            <div>
              <span>Interstatex PSA</span> <br />
              <span>Jarzyły 2 06-216 Polska</span> <br />
              <span>NIP7571494909</span>
            </div>
          </main>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
