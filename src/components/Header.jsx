import React from "react";
import headerStyle from "../scss/components/header.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsLoaded } from "../Redux/introSlice";

const Header = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 800);
  const [menuVisible, setMenuVisible] = React.useState(false);
  const dispatch = useDispatch();

  const sections = {
    0: "About us",
    1: "Services",
    2: "Our works",
    3: "Our team",
    4: "Contacts",
  };

  const handleMenuVisible = () => setMenuVisible(!menuVisible);

  const handleActiveButton = (id) => {
    if (isMobile) setMenuVisible(false);
    const element = document.getElementById(sections[id]);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 800);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`${headerStyle.Headerlayout} ${
        menuVisible && isMobile ? headerStyle.active : ""
      }`}
    >
      <div className={headerStyle.headerContent}>
        <div
          className={headerStyle.titleSide}
          onClick={() => {
            navigate("/");
            window.scrollTo(0, 0);
            dispatch(setIsLoaded(true));
          }}
        >
          OffScreen
        </div>

        <div
          className={`${headerStyle.buttonSide} ${
            isMobile ? headerStyle.mobile : ""
          } ${menuVisible ? headerStyle.active : ""}`}
        >
          <ul>
            {Object.keys(sections).map((key) => (
              <li
                key={key}
                onClick={() => handleActiveButton(key)}
                className={headerStyle.h_but_s}
              >
                <span>{sections[key].replace("_", " ")}</span>
              </li>
            ))}
            {!isMobile && (
              <Link to="/Contact" className={headerStyle.h_but_s}>
                <span>get in touch</span>
              </Link>
            )}
          </ul>
        </div>

        {isMobile && (
          <Link to="/Contact" className={headerStyle.h_but_s_Mobile}>
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
