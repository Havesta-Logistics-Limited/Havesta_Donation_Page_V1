import React from "react";
import { useState, useRef, useEffect } from "react";
import pitch from "../assets/PitchDeck-Havesta.pdf";
import videopitch from "../assets/HavestaPitch.MOV";
import rectangle1 from "../assets/Rectangle1.svg";
import rectangle2 from "../assets/Rectangle2.svg";
import rectangle3 from "../assets/Rectangle3.svg";
import rectangle4 from "../assets/Rectangle4.svg";
import rectangle5 from "../assets/Rectangle5.svg";
import rectangle6 from "../assets/Rectangle6.svg";
import heart from "../assets/heart.svg";

import star from "../assets/star.png";
import like from "../assets/like.svg";
import whatsapp from "../assets/whatsapp.svg";
import { FaPlay } from "react-icons/fa";
import DonateNow from "./DonateNow";
import "./../css/Maincontent.css";

const Donation = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Intersection Observer to check when video enters the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isPlaying) {
            video.play();
            setIsPlaying(true);
            // } else if (!entry.isIntersecting && isPlaying) {
            //   video.pause();
            //   setIsPlaying(false);
          }
        });
      },
      { threshold: 0.5 } // play only when 50% visible
    );

    observer.observe(video);

    return () => {
      if (video) observer.unobserve(video);
    };
  }, []);

  const handleVideoClick = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };
  const donators = [
    {
      id: 0,
      name: "Anonymous",
      amount: "100,000",
      time: "15 hrs",
    },
    {
      id: 1,
      name: "Anonymous",
      amount: "500,000",
      time: "17 hrs",
    },
    {
      id: 2,
      name: "Anonymous",
      amount: "300,000",
      time: "2 d",
    },
    {
      id: 3,
      name: "Anonymous",
      amount: "700,000",
      time: "4 d",
    },
    {
      id: 4,
      name: "John Amobeda",
      amount: "900,000",
      time: "4 d",
    },
    {
      id: 5,
      name: "John Amobeda",
      amount: "900,000",
      time: "4 d",
    },
  ];

  let numberofdonators = donators.length;

  const totalAmountRaised = donators.reduce((acc, item) => {
    // Remove commas and any non-numeric characters
    const num = Number(String(item.amount).replace(/,/g, ""));
    return acc + (isNaN(num) ? 0 : num);
  }, 0);

  const percentageraised = totalAmountRaised / 10000000;

  // sharenow button
  const handleShare = () => {
    const message = encodeURIComponent(
      ` Havesta is currently crowdfunding to bring our MVP to life 🚀.\n\nWith your support, we can create a digital product that connects farmers directly to customers—making Fresh Farm Produce, Healthy Livestock, and other Agri-Inputs accessible to all while transforming agriculture in Nigeria.\n\nThis initiative has huge growth potential and we’re inviting you to be part of the early supporters who will make this vision possible.\n\n✨ Every donation makes a difference.\n\n📢 Please Donate today & help share this with your friends!\n\nCheck it out here: https://your-link.com`
    );
    const whatsappUrl = `https://api.whatsapp.com/send?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  // speak with the speaker

  const speakerNumber = "2347011096453"; // Noel's no.
  const message = encodeURIComponent(
    `Hello, I’d like to learn more about Havesta.`
  );
  const whatsappUrl = `https://wa.me/${speakerNumber}?text=${message}`;

  const speakClick = () => {
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="bg-white flex flex-col items-center px-6 py-8 md:px-9 lg:px-11">
      <h1 className="text-[#232323] font-bold text-xl mb-6 text-center sm:mb-9">
        HELP BRING OUR MVP TO LIVE BY DONATING
      </h1>

      <div className="flex flex-col gap-8 items-center sm:grid sm:grid-cols-2 sm:items-start md:grid-cols-[360px_1fr] lg:grid-cols-[25%_40%_30%]">
        {/* video section */}

        <div className="w-full sm:order-1 h-full sm:flex sm:flex-col sm:justify-center">
          <div className="relative  max-w-sm flex flex-col items-center justify-center w-full m-auto z-50 ">
            <video
              ref={videoRef}
              className="w-full max-w-3xl rounded-2xl shadow-lg cursor-pointer m-auto  "
              onClick={handleVideoClick}
              playsInline
              preload="auto"
              controls={false}
              style={{ objectFit: "cover" }}
            >
              <source src={videopitch} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {!isPlaying && (
              <div
                className="w-full h-full bg-black opacity-50 absolute top-0 left-0 flex items-center justify-center rounded-2xl"
                onClick={handleVideoClick}
              >
                <FaPlay className="text-6xl text-white" />
              </div>
            )}
          </div>
          <div
            className="lightgreenbg text-[#273f2b] font-bold rounded-3xl py-5  flex  items-center justify-center text-center  gap-2 w-[80%] px-2 m-auto mt-4 cursor-pointer sm:text-sm lg:w-[80%]"
            onClick={speakClick}
          >
            <img src={whatsapp} alt="" className="w-7 sm:w-6" />
            <p className="">Speak With The Founder</p>
          </div>
        </div>

        {/* what we do */}
        <div className="flex flex-col gap-6 w-full sm:gap-4 sm:order-3 sm:col-span-2 sm:mt-3 lg:order-2 lg:col-span-1 lg:mt-0">
          {/* images */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-0">
            <img src={rectangle1} alt="" className="w-full" />
            <img src={rectangle2} alt="" className="w-full" />
            <img src={rectangle3} alt="" className="w-full" />
            <img src={rectangle4} alt="" className="w-full" />
            <img src={rectangle5} alt="" className="w-full" />
            <img src={rectangle6} alt="" className="w-full" />
          </div>
          {/* donate and download */}
          <div className="w-full flex flex-col gap-3 mt-3 sm:mt-1 sm:gap-2 ">
            <DonateNow />
            <div className="w-full">
              <a
                href={pitch}
                download="Pitch Deck - Havesta"
                className="block cursor-pointer text-center rounded-3xl text-white greenbg font-bold py-4 px-2 "
              >
                Download Pitch
              </a>
            </div>
          </div>

          {/* Mision */}
          <div className="text-[#232323] mt-3 sm:mt-1">
            <p className="font-bold text-sm mb-4">Our Mission (Why Donate?)</p>

            <p
              className={`text-base leading-relaxed mb-3 ${
                !isExpanded ? "line-clamp-[14] sm:line-clamp-[8]" : ""
              }`}
            >
              It’s important to build{" "}
              <span className="font-bold">Havesta </span>
              because we see a massive gap between food production and consumer
              access in Africa — one that directly impacts{" "}
              <span className="font-bold">
                {" "}
                farmer incomes, food quality, and community health
              </span>
              . By creating a reliable platform that connects farmers and
              vendors directly to customers, we are addressing{" "}
              <span className="font-bold">
                post-harvest losses, unfair middleman practices, and
                inconsistent product quality{" "}
              </span>
              . For me, this isn’t just a business;
              <span className="font-bold text-[#02A95C] ">
                {" "}
                it’s a mission to empower local farmers, make fresh and healthy
                food easily accessible, and create a sustainable supply chain
                that benefits everyone involved
              </span>
              .{" "}
              <span className="block mt-1">
                The agricultural sector in Nigeria has enormous untapped
                potential, and{" "}
                <span className="font-bold">
                  {" "}
                  Havesta is our way of unlocking it through technology,
                  logistics, and trust
                </span>
                . Ultimately, building Havesta is about solving a real problem
                that affects millions, while creating lasting economic and
                social impact.{" "}
                <span className="font-bold block mt-1">
                  Download the Pitch to get more information.
                </span>
              </span>
            </p>

            <p
              onClick={() => setIsExpanded(!isExpanded)}
              className="cursor-pointer text-[#232323] underline w-fit"
            >
              {isExpanded ? "Read Less" : "Read More"}
            </p>

            <div className="like flex items-center mt-3 gap-1">
              <img src={like} alt="" className="mr-2 cursor-pointer" />
              <p>💚</p>
              <p>🙏</p>
              <p>💐</p>
              <p>👏</p>
              <p>✨</p>
              <p className="underline">85</p>
            </div>
          </div>
        </div>

        {/* payment and progress bar */}

        <div className="border rounded-3xl shadow-[-5px_5px_16px_-2px_rgba(0,0,0,0.2),5px_-5px_16px_2px_rgba(0,0,0,0.2)] w-full py-6 px-4 mt-5 sm:order-2 sm:mt-0 lg:order-3 lg:rounded-md">
          <div className="">
            <div className=" flex justify-between items-center">
              <div className=" w-[200px] flex flex-col gap-1 lg:w-[180px]">
                <h1 className="text-[#232323] font-bold text-xl flex justify-between sm:text-lg">
                  {" "}
                  ₦{totalAmountRaised}
                  <span className="font-normal pr-4">raised</span>
                </h1>
                <div className="font-bold flex justify-between items-center text-sm sm:text-xs">
                  <p className="textgreen">₦10M Goal</p>
                  <p className="text-[#6F6F6F] -mt-1">.</p>
                  <p className="text-[#6F6F6F]">{numberofdonators} donations</p>
                </div>
              </div>

              <div className="relative flex items-center justify-center w-20 h-20 ">
                <svg className="w-20 h-20">
                  {/* Background Circle */}
                  <circle
                    className="text-gray-200"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="36"
                    cx="40"
                    cy="40"
                  />
                  {/* Progress Circle */}
                  <circle
                    className="text-[#01BE72]"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="36"
                    cx="40"
                    cy="40"
                    strokeDasharray={2 * Math.PI * 36}
                    strokeDashoffset={2 * Math.PI * 36 * (1 - percentageraised)} //
                    strokeLinecap="round"
                    transform="rotate(-90 40 40)"
                  />
                </svg>
                <span className="absolute text-lg ">
                  {percentageraised * 100}%
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <div
                className="block cursor-pointer text-center rounded-3xl text-white greenbg font-bold py-4 px-2 "
                onClick={handleShare}
              >
                Share now
              </div>
              <div className=" cta-button donate-btn">
                <DonateNow />
              </div>
              {/* <div className="block cursor-pointer text-center rounded-3xl  textgreen yellowbg font-bold py-4 px-2 ">
                Donate now
              </div> */}
            </div>

            {/* donators */}

            <div className="flex flex-col  gap-4 mt-8 mb-8 sm:gap-2 sm:mt-5">
              {donators.map((donator) => (
                <div
                  key={donator.id}
                  className="flex items-center gap-3  w-fit pr-8"
                >
                  <img src={heart} alt="" className="w-14" />
                  <div className="flex flex-col gap-1 w-36">
                    <h1 className="text-[#232323] text-lg sm:text-base">
                      {donator.name}
                    </h1>
                    <div className=" flex  items-center gap-2 text-sm">
                      <p className="text-[#232323] font-bold">
                        ₦{donator.amount}
                      </p>
                      <p className="text-[#232323] -mt-1">.</p>
                      <p className="text-[#232323]">{donator.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-[#232323] flex justify-between font-bold text-lg">
              <div className="cursor-pointer border border-[#B7B7B6] w-[48%] text-center  py-3 rounded-3xl">
                See all
              </div>
              <div className="flex gap-2 items-center cursor-pointer border border-[#B7B7B6] w-[48%] text-center  py-3 rounded-3xl justify-center">
                <img src={star} alt="" className="w-5" />
                See top
              </div>
            </div>
          </div>

          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Donation;
