import React from "react";
import headerStyle from "../scss/components/header.module.scss";
import { Link } from "react-router-dom";

const Header = () => {
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseEnter = () => {
    if (!isHovered) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={
        isHovered === true
          ? `${headerStyle.Headerlayout} ${headerStyle.active}`
          : `${headerStyle.Headerlayout}`
      }
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={headerStyle.headerContent}>
        <div className={headerStyle.titleSide}>OffScreen</div>
        <div className={headerStyle.buttonSide}>
          <div className={headerStyle.h_but_s}>
            <span>About Us</span>
          </div>
          <div className={headerStyle.h_but_s}>
            <span>Services</span>
          </div>
          <div className={headerStyle.h_but_s}>
            <span>our works</span>
          </div>
          <div className={headerStyle.h_but_s}>
            <span>our team</span>
          </div>
          <Link to={`/Contact`} className={headerStyle.h_but_s}>
            <span>get in touch</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
