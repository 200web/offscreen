import React from "react";
import AdvantageSection from "../sections/AdvantageSection";
import HeaderSection from "../sections/HeaderSection";
import WorksSection from "../sections/WorksSection";
import FooterSection from "../sections/FooterSection";
import Header from "../components/Header";
import Intro from "../components/Intro";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <>
      <Intro />
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
