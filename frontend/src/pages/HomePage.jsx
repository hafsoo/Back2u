import React from "react";
import Header from "../components/Layout/Header.jsx";
import Hero from "../components/Route/Hero/Hero.jsx";
import Footer from "../components/Layout/Footer.jsx";
import FeaturesSection from "../components/Route/FeaturesSection/FeaturesSection.jsx";
import Working from "../components/Route/HowWorks/Working.jsx";
import StatsSection from "../components/StatsSection/StatsSection.jsx";

const HomePage = () => {
  return (
    <div>
      <Header activeHeading={1} />
      <Hero />
      <br />
      <br />
      <StatsSection/>
      <br/>
      <br/>
      <FeaturesSection />
      <br />
      <Working />
      <Footer />

     
    </div>
  );
};

export default HomePage;
