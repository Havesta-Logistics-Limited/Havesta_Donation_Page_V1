import React from "react";
import logo from "../assets/logo.svg";

const Footer = () => {
  return (
    <div className="px-4 bg-[#090808] flex flex-col items-center justify-center py-6 mt-3">
      <div className="flex text-white items-end font-bold text-3xl ">
        Havesta <img src={logo} alt="" className="w-10 " />
      </div>
      <p className="text-white mt-4 font-extralight">
        © Copyright 2025. All Rights Reserved
      </p>
    </div>
  );
};

export default Footer;
