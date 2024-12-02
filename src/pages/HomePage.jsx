import React from "react";
import AdvantageSection from "../sections/AdvantageSection";
import HeaderSection from "../sections/HeaderSection";
import WorksSection from "../sections/WorksSection";
import FooterSection from "../sections/FooterSection";
import Header from "../components/Header";
import Intro from "../components/Intro";
import Footer from "../components/Footer";
import AboutUs from "../sections/AboutUs";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearScrollToElement } from "../Redux/scrollSlice";

const HomePage = () => {
  const location = useLocation();
  const scrollToElement = useSelector((state) => state.scroll.scrollToElement);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (location.state?.scrollToTeam) {
      const teamElement = document.getElementById("Our team");
      if (teamElement) {
        const elementPosition =
          teamElement.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: elementPosition,
          behavior: "smooth",
        });
      }
    }
    if (scrollToElement) {
      const element = document.getElementById(scrollToElement);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        dispatch(clearScrollToElement());
      }
    }
    if (location.state?.scrollTo === "About us") {
      const element = document.getElementById("About us");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (location.state?.scrollTo === "Services") {
      const element = document.getElementById("Services");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (location.state?.scrollTo === "Our works") {
      const element = document.getElementById("Our works");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (location.state?.scrollTo === "Our team") {
      const element = document.getElementById("Our team");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (location.state?.scrollTo === "Contacts") {
      const element = document.getElementById("Contacts");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location, scrollToElement, dispatch]);

  return (
    <>
      {/* <Intro /> */}
      <Header />
      <HeaderSection />
      <AboutUs />
      {/* <AdvantageSection /> */}
      <WorksSection />
      <FooterSection />
    </>
  );
};

export default HomePage;
