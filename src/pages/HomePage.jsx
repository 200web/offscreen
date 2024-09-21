import React from "react";
import AdvantageSection from "../sections/AdvantageSection";
import HeaderSection from "../sections/HeaderSection";
import WorksSection from "../sections/WorksSection";
import FooterSection from "../sections/FooterSection";
import Header from "../components/Header";
import Intro from "../components/Intro";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";

const HomePage = () => {
  const location = useLocation();

  React.useEffect(() => {
    if (location.state?.scrollToTeam) {
      const teamElement = document.getElementById("Team");
      if (teamElement) {
        teamElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  return (
    <>
      <Header />
      <HeaderSection />
      <AdvantageSection />
      <WorksSection />
      <FooterSection />
      <Footer />
    </>
  );
};

export default HomePage;
