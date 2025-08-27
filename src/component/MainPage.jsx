import React from "react";
import havestaLogo from "../assets/logo.svg";
import watermelon from "../assets/water-Melon.svg";
import bellPepper from "../assets/bellpepper.svg";
import palmOil from "../assets/palmoil.svg";
import chickenWings from "../assets/chicken.svg";
import sweetBeans from "../assets/beans.svg";
import titusFish from "../assets/fish.svg";
import plantain from "../assets/plantain.svg";
import "./../css/Maincontent.css";
import ShareNow from "../component/ShareNow";
import DonateNow from "../component/DonateNow";
const MainPage = () => {
  return (
    <div className="greenbg text-white py-3 px-10 pb-14">
      <div className="font-bold flex  justify-center items-center text-2xl mb-16">
        Havesta
        <img src={havestaLogo} alt="" className="w-9 -mt-2 " />
      </div>

      {/* MAINSECTION */}
      <div className="flex flex-col  text-center  lg:text-left lg:flex-row xl:justify-center xl:-ml-16">
        <div className="flex flex-col w-full lg:w-[50%] ">
          <h1 className="font-bold text-2xl mb-8 sm:text-3xl max-w-2xl m-auto lg:m-0 lg:mb-8 lg:max-w-xl xl:text-4xl xl:max-w-2xl  ">
            SUPPORT OUR CAUSE IN BUILDING NIGERIA'S AGRICULTURE FUTURE
          </h1>
          <p className="text-base m-auto max-w-lg font-light mb-8 lg:m-0 lg:mb-8 xl:max-w-xl">
            Be part of the first persons to support our cause by donating to
            bring our MVP to live. This will help us create a foundation for
            scaling across regions after successful product-market fit
            validation.
          </p>

          <div className="flex justify-center gap-3 lg:justify-start">
            <div className="w-36">
              <DonateNow />
            </div>
            <div className="w-40">
              <ShareNow />
            </div>
          </div>
        </div>

        {/* the image part */}

        <div className="hidden lg:flex lg:flex-col  h-[320px] relative w-[400px]  ">
          <div className="absolute   top-32 left-72 ">
            <div className="relative">
              <img src={sweetBeans} alt="" className="w-24" />
              <div className="bg-[#E2BF88] text-[#273F2B] w-24 text-center text-xs px-2 py-2 rounded-2xl font-bold absolute top-8 left-14">
                Sweet Beans
              </div>
            </div>
          </div>

          <div className="absolute -top-2 -right-16">
            <div className="relative">
              <img src={palmOil} alt="" className=" w-24" />
              <div className="bg-[#A7E3E3] text-[#273F2B] w-20 text-center text-xs py-2 rounded-2xl font-bold absolute top-8 left-14">
                Palm Oil
              </div>
            </div>
          </div>

          <div className="absolute -top-2 left-[12.5rem] ">
            <div className="relative">
              <img src={bellPepper} alt="" className="w-24 " />
              <div className="bg-[#ECCFF6] text-[#273F2B] w-24 text-center text-xs px-2 py-2 rounded-2xl font-bold absolute top-8 left-14">
                Bell Pepper
              </div>
            </div>
          </div>

          <div className="absolute   top-32 left-32">
            <div className="relative">
              <img src={chickenWings} alt="" className="w-24" />
              <div className="bg-[#FFB2CE] text-[#273F2B] w-28 text-center text-xs px-1 py-2 rounded-2xl font-bold absolute top-9 right-14">
                Chicken Wings
              </div>
            </div>
          </div>

          <div className="absolute  -bottom-4 left-10">
            <div className="relative">
              <img src={titusFish} alt="" className=" w-24" />
              <div className="bg-[#E2E2E2] text-[#273F2B] w-24 text-center text-xs px-1 py-2 rounded-2xl font-bold absolute top-9 right-14">
                Titus Fish
              </div>
            </div>
          </div>

          <div className="absolute -bottom-4 left-52">
            <div className="relative">
              <img src={plantain} alt="" className=" w-24" />
              <div className="bg-[#CCF3E5] text-[#273F2B] w-24 text-center text-xs py-2 rounded-2xl font-bold absolute top-8 left-[4.6rem]">
                Plantain
              </div>
            </div>
          </div>

          <div className="absolute -top-2 left-8">
            <div className="relative">
              <img src={watermelon} alt="" className="  w-24" />
              <div className="bg-[#CCF88E] text-[#273F2B] w-24 text-center text-xs py-2 rounded-2xl font-bold absolute top-8 left-14">
                Watermelon
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
