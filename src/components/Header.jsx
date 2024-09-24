import React from "react";
import headerStyle from "../scss/components/header.module.scss";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
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

  const handleActiveButton = (id) => {
    if (isMobile) {
      setMenuVisible(!menuVisible);
    }
    switch (id) {
      case 0: {
        const element = document.getElementById("about us");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
        break;
      }

      case 1: {
        const element = document.getElementById("services");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
        break;
      }

      case 2: {
        const element = document.getElementById("our works");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
        break;
      }

      case 3: {
        const element = document.getElementById("Team");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
        break;
      }
    }
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
        <div className={headerStyle.titleSide}>
          <span
            onClick={() => {
              navigate("/");
              window.scrollTo(0, 0);
            }}
          >
            OffScreen
          </span>
        </div>
        <div
          className={`${headerStyle.buttonSide} ${
            isMobile ? headerStyle.mobile : ""
          } ${menuVisible && isMobile ? headerStyle.active : ""}`}
        >
          <ul>
            {!isMobile && (
              <li
                className={headerStyle.h_but_s}
                onClick={() => handleActiveButton(0)}
              >
                <span>About Us</span>
              </li>
            )}
            <li
              className={headerStyle.h_but_s}
              onClick={() => handleActiveButton(1)}
            >
              <span>Services</span>
            </li>
            <li
              className={headerStyle.h_but_s}
              onClick={() => handleActiveButton(2)}
            >
              <span>our works</span>
            </li>
            <li
              className={headerStyle.h_but_s}
              onClick={() => handleActiveButton(3)}
            >
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
