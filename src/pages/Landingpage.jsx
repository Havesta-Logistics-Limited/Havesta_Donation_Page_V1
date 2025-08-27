import React from "react";
import Maincontent from "../component/Maincontent";
import Donation from "../component/Donation";
import Footer from "../component/Footer";
import MainPage from "../component/MainPage";

const Landingpage = () => {
  return (
    <div>
      <MainPage />
      <Donation />
      <Footer />
    </div>
  );
};

export default Landingpage;
