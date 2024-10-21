import React from "react";
import AdvantageSection from "../sections/AdvantageSection";
import HeaderSection from "../sections/HeaderSection";
import WorksSection from "../sections/WorksSection";
import FooterSection from "../sections/FooterSection";
import Header from "../components/Header";
import Intro from "../components/Intro";
import Footer from "../components/Footer";
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
  }, [location, scrollToElement, dispatch]);

  return (
    <>
      {/* <Intro /> */}
      <Header />
      <HeaderSection />
      <AdvantageSection />
      <WorksSection />
      <FooterSection />
    </>
  );
};

export default HomePage;
