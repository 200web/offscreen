import React from "react";
import headerStyle from "../scss/components/header.module.scss";
import { Link } from "react-router-dom";

const Header = () => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 690);
  const [menuVisible, setMenuVisible] = React.useState(false);

  const handleMouseEnter = () => {
    if (!isHovered) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMenuVisible = () => {
    setMenuVisible(!menuVisible);
  };

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 690);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={
        isHovered === true
          ? `${headerStyle.Headerlayout} ${headerStyle.active}`
          : `${headerStyle.Headerlayout}`
      }
    >
      <div
        className={headerStyle.headerContent}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={headerStyle.titleSide}>OffScreen</div>
        <div
          className={`${headerStyle.buttonSide} ${
            isMobile ? headerStyle.mobile : ""
          } ${menuVisible && isMobile ? headerStyle.active : ""}`}
        >
          <ul>
            <li className={headerStyle.h_but_s}>
              <span>About Us</span>
            </li>
            <li className={headerStyle.h_but_s}>
              <span>Services</span>
            </li>
            <li className={headerStyle.h_but_s}>
              <span>our works</span>
            </li>
            <li className={headerStyle.h_but_s}>
              <span>our team</span>
            </li>
            {!isMobile && (
              <Link to={`/Contact`} className={headerStyle.h_but_s}>
                <span>get in touch</span>
              </Link>
            )}
          </ul>
        </div>
        {isMobile && (
          <Link to={`/Contact`} className={headerStyle.h_but_s_Mobile}>
            <span>get in touch</span>
          </Link>
        )}
        <div
          className={`${headerStyle.menuButton} ${
            isMobile ? headerStyle.visible : ""
          } ${menuVisible ? headerStyle.active : ""}`}
          onClick={handleMenuVisible}
        >
          <span className={headerStyle.toggle}></span>
          <span className={headerStyle.toggle}></span>
          <span className={headerStyle.toggle}></span>
        </div>
      </div>
    </div>
  );
};

export default Header;
