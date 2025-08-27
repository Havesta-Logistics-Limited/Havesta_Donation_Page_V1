// src/components/Maincontent.jsx
import React from "react";
import "./../css/Maincontent.css";

import havestaLogo from "../assets/logo.svg";
import watermelon from "../assets/water-Melon.svg";
import bellPepper from "../assets/bellpepper.svg";
import palmOil from "../assets/palmoil.svg";
import chickenWings from "../assets/chicken.svg";
import sweetBeans from "../assets/beans.svg";
import titusFish from "../assets/fish.svg";
import plantain from "../assets/plantain.svg";
import ShareNow from "../component/ShareNow";
import DonateNow from "../component/DonateNow";

const Maincontent = () => {
  return (
    <div className="main-content ">
      {/* Logo */}
      <div className="logo">
        <h1 className="logo-text">Havesta</h1>
        <img src={havestaLogo} alt="Havesta Logo" />
      </div>

      {/* Hero Text */}
      <div className="hero-text">
        <h1>SUPPORT OUR CAUSE IN BUILDING NIGERIA'S AGRICULTURE FUTURE</h1>
        <p>
          Be part of the first persons to support our cause by donating to bring
          our MVP to live. This will help us create a foundation for scaling
          across regions after successful product-market fit validation.
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="cta-buttons">
        <DonateNow />
        <ShareNow />
      </div>

      {/* Products Grid */}
      <div className="products-grid">
        {/* Watermelon */}
        <div className="product-item watermelon">
          <img src={watermelon} alt="Watermelon" />
          <span className="product-label label-watermelon">Watermelon</span>
        </div>

        {/* Bell Pepper */}
        <div className="product-item bell-pepper">
          <img src={bellPepper} alt="Bell Pepper" />
          <span className="product-label label-bell-pepper">Bell Pepper</span>
        </div>

        {/* Palm Oil */}
        <div className="product-item palm-oil">
          <img src={palmOil} alt="Palm Oil" />
          <span className="product-label label-palm-oil">Palm Oil</span>
        </div>

        {/* Chicken Wings */}
        <div className="product-item chicken-wings">
          <img src={chickenWings} alt="Chicken Wings" />
          <span className="product-label label-chicken-wings">
            Chicken Wings
          </span>
        </div>

        {/* Sweet Beans */}
        <div className="product-item sweet-beans">
          <img src={sweetBeans} alt="Sweet Beans" />
          <span className="product-label label-sweet-beans">Sweet Beans</span>
        </div>

        {/* Titus Fish */}
        <div className="product-item titus-fish">
          <img src={titusFish} alt="Titus Fish" />
          <span className="product-label label-titus-fish">Titus Fish</span>
        </div>

        {/* Plantain */}
        <div className="product-item plantain">
          <img src={plantain} alt="Plantain" />
          <span className="product-label label-plantain">Plantain</span>
        </div>
      </div>
    </div>
  );
};

export default Maincontent;
