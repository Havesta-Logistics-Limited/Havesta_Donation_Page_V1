import React, { useState, useRef, useEffect } from "react";
import pitch from "../assets/PitchDeck-Havesta.pdf";
import videopitch from "../assets/HavestaPitch.MOV";
import rectangle1 from "../assets/Rectangle1.svg";
import rectangle2 from "../assets/Rectangle2.svg";
import rectangle3 from "../assets/Rectangle3.svg";
import rectangle4 from "../assets/Rectangle4.svg";
import rectangle5 from "../assets/Rectangle5.svg";
import rectangle6 from "../assets/Rectangle6.svg";
import heart from "../assets/heart.svg";
import whatsapp from "../assets/whatsapp.svg";
import { FaPlay } from "react-icons/fa";
import DonateNow from "./DonateNow";
import "./../css/Maincontent.css";
import ReactionButton from "./ReactionButton";
import { getDonations } from "../lib/firebase/firebase";

const VideoSection = ({
  videoRef,
  isPlaying,
  handleVideoClick,
  speakClick,
}) => (
  <div className="w-full sm:order-1 h-full sm:flex sm:flex-col sm:justify-center">
    <div className="relative  max-w-sm flex flex-col items-center justify-center w-full m-auto z-50 ">
      <video
        ref={videoRef}
        className="w-full max-w-3xl rounded-2xl shadow-lg cursor-pointer m-auto"
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
      className="lightgreenbg text-[#273f2b] font-bold rounded-3xl py-5 flex items-center justify-center text-center gap-2 w-[80%] px-2 m-auto mt-4 cursor-pointer sm:text-sm lg:w-[80%]"
      onClick={speakClick}
    >
      <img src={whatsapp} alt="" className="w-7 sm:w-6" />
      <p>Speak With The Founder</p>
    </div>
  </div>
);

const GallerySection = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 gap-0">
    <img src={rectangle1} alt="" className="w-full" />
    <img src={rectangle2} alt="" className="w-full" />
    <img src={rectangle3} alt="" className="w-full" />
    <img src={rectangle4} alt="" className="w-full" />
    <img src={rectangle5} alt="" className="w-full" />
    <img src={rectangle6} alt="" className="w-full" />
  </div>
);

const MissionSection = ({ isExpanded, setIsExpanded }) => (
  <div className="text-[#232323] mt-3 sm:mt-1">
    <p className="font-bold text-sm mb-4">Our Mission (Why Donate?)</p>

    <p
      className={`text-base leading-relaxed mb-3 ${
        !isExpanded ? "line-clamp-[14] sm:line-clamp-[8]" : ""
      }`}
    >
      It's important to build <span className="font-bold">Havesta </span>
      because we see a massive gap between food production and consumer access
      in Africa — one that directly impacts{" "}
      <span className="font-bold">
        farmer incomes, food quality, and community health
      </span>
      . By creating a reliable platform that connects farmers and vendors
      directly to customers, we are addressing{" "}
      <span className="font-bold">
        post-harvest losses, unfair middleman practices, and inconsistent
        product quality
      </span>
      . For me, this isn't just a business;
      <span className="font-bold text-[#02A95C]">
        it's a mission to empower local farmers, make fresh and healthy food
        easily accessible, and create a sustainable supply chain that benefits
        everyone
      </span>
      .{" "}
      <span className="block mt-1">
        The agricultural sector in Nigeria has enormous untapped potential, and{" "}
        <span className="font-bold">
          Havesta is our way of unlocking it through technology, logistics, and
          trust
        </span>
        . Ultimately, building Havesta is about solving a real problem that
        affects millions, while creating lasting economic and social impact.
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
    {/** LIKES  **/}
    <ReactionButton />
  </div>
);

const DonatorList = ({ donators, loading }) => {
  if (loading) {
    return (
      <div className="flex flex-col gap-4 mt-8 mb-8 sm:gap-2 sm:mt-5">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-3 w-fit pr-8 animate-pulse"
          >
            <div className="w-14 h-14 bg-gray-200 rounded-full"></div>
            <div className="flex flex-col gap-1 w-36">
              <div className="h-5 bg-gray-200 rounded w-24"></div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (donators.length === 0) {
    return (
      <div className="flex flex-col gap-4 mt-8 mb-8 sm:gap-2 sm:mt-5">
        <p className="text-[#232323] text-center py-4">
          No donations yet. Be the first to donate!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 mt-8 mb-8 sm:gap-2 sm:mt-5">
      {donators.map((donator) => (
        <div key={donator.id} className="flex items-center gap-3 w-fit pr-8">
          <img src={heart} alt="" className="w-14" />
          <div className="flex flex-col gap-1 w-36">
            <h1 className="text-[#232323] text-lg sm:text-base">
              {donator.name || "Anonymous"}
            </h1>
            <div className="flex items-center gap-2 text-sm">
              <p className="text-[#232323] font-bold">
                ₦{donator.amount.toLocaleString()}
              </p>
              <p className="text-[#232323] -mt-1">.</p>
              <p className="text-[#232323]">{donator.timeAgo}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const ProgressSection = ({
  totalAmountRaised,
  numberofdonators,
  percentageraised,
  handleShare,
  donators,
  loading,
}) => (
  <div className="border rounded-3xl shadow-[-5px_5px_16px_-2px_rgba(0,0,0,0.2),5px_-5px_16px_2px_rgba(0,0,0,0.2)] w-full py-6 px-4 mt-5 sm:order-2 sm:mt-0 lg:order-3 lg:rounded-md">
    <div>
      <div className="flex justify-between items-center">
        <div className="w-[200px] flex flex-col gap-1 lg:w-[180px]">
          <h1 className="text-[#232323] font-bold text-xl flex justify-between sm:text-lg">
            ₦{totalAmountRaised.toLocaleString()}
            <span className="font-normal pr-4">Raised</span>
          </h1>
          <div className="font-bold flex justify-between items-center text-sm sm:text-xs">
            <p className="textgreen">₦10M Goal</p>
            <p className="text-[#6F6F6F] -mt-1">.</p>
            <p className="text-[#6F6F6F]">{numberofdonators} donations</p>
          </div>
        </div>

        <div className="relative flex items-center justify-center w-20 h-20">
          <svg className="w-20 h-20">
            <circle
              className="text-gray-200"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              r="36"
              cx="40"
              cy="40"
            />
            <circle
              className="text-[#01BE72]"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              r="36"
              cx="40"
              cy="40"
              strokeDasharray={2 * Math.PI * 36}
              strokeDashoffset={2 * Math.PI * 36 * (1 - percentageraised)}
              strokeLinecap="round"
              transform="rotate(-90 40 40)"
            />
          </svg>
          <span className="absolute text-lg ">
            {(percentageraised * 100).toFixed(1)}%
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <div
          className="block cursor-pointer text-center rounded-3xl text-white greenbg font-bold py-4 px-2"
          onClick={handleShare}
        >
          Share now
        </div>
        <div className="cta-button donate-btn">
          <DonateNow />
        </div>
      </div>

      <DonatorList donators={donators} loading={loading} />

      <div className="text-[#232323] flex justify-between font-bold text-lg">
        <div className="flex gap-2 items-center cursor-pointer border border-[#B7B7B6] w-full text-center py-3 rounded-3xl justify-center">
          See Top Donators
        </div>
      </div>
    </div>
  </div>
);

// Utility function to calculate time ago
const getTimeAgo = (timestamp) => {
  const now = new Date();
  const donationTime = timestamp.toDate
    ? timestamp.toDate()
    : new Date(timestamp);
  const diffTime = Math.abs(now - donationTime);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffTime / (1000 * 60));

  if (diffDays > 0) {
    return `${diffDays} d`;
  } else if (diffHours > 0) {
    return `${diffHours} hrs`;
  } else if (diffMinutes > 0) {
    return `${diffMinutes} min`;
  } else {
    return "just now";
  }
};

const Donation = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // State for donations data
  const [donators, setDonators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch donations from database
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        setLoading(true);
        const donations = await getDonations();

        // Transform the data to match your component's expected format
        const transformedDonations = donations.map((donation) => ({
          id: donation.id,
          name: donation.name.split(" ")[0] || "Anonymous",
          amount: donation.amount,
          createdAt: Number(donation.createdAt || donation.timestamp),
          timeAgo: getTimeAgo(donation.createdAt || donation.timestamp),
          reference: donation.reference,
          status: donation.status,
        }));
        // Sort by most recent first
        transformedDonations.sort((a, b) => b.createdAt - a.createdAt);

        setDonators(transformedDonations);
        setError(null);
      } catch (err) {
        console.error("Error fetching donations:", err);
        setError("Failed to load donations");
        // Fallback to empty array or show error state
        setDonators([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  // Calculate totals from fetched data
  const numberofdonators = donators.length;
  const totalAmountRaised = donators.reduce((acc, item) => {
    return acc + (item.amount || 0);
  }, 0);
  const percentageraised = Math.min(totalAmountRaised / 10000000, 1); // Cap at 100%

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isPlaying) {
            video.play();
            setIsPlaying(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(video);
    return () => {
      if (video) observer.unobserve(video);
    };
  }, [isPlaying]);

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

  const handleShare = () => {
    const message = encodeURIComponent(
      ` Havesta is currently crowdfunding to bring our MVP to life 🚀.\n\nWith your support, we can create a digital product that connects farmers directly to customers—making Fresh Farm Produce, Healthy Livestock, and other Agri-Inputs accessible to all while transforming agriculture in Nigeria.\n\nThis initiative has huge growth potential and we're inviting you to be part of the early supporters who will make this vision possible.\n\n✨ Every donation makes a difference.\n\n📢 Please Donate today & help share this with your friends!\n\nCheck it out here: https://your-link.com`
    );
    const whatsappUrl = `https://api.whatsapp.com/send?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  const speakClick = () => {
    const speakerNumber = "2347011096453";
    const message = encodeURIComponent(
      `Hello, I'd like to learn more about Havesta.`
    );
    const whatsappUrl = `https://wa.me/${speakerNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  // Show error state if there's an error
  if (error && !loading) {
    console.error("Donation loading error:", error);
    // You can still show the component with empty data
  }

  return (
    <div className="bg-white flex flex-col items-center px-6 py-8 md:px-9 lg:px-11">
      <h1 className="text-[#232323] font-bold text-xl mb-6 text-center sm:mb-9">
        HELP BRING OUR MVP TO LIVE BY DONATING
      </h1>

      <div className="flex flex-col gap-8 items-center sm:grid sm:grid-cols-2 sm:items-start md:grid-cols-[360px_1fr] lg:grid-cols-[25%_40%_30%]">
        <VideoSection
          videoRef={videoRef}
          isPlaying={isPlaying}
          handleVideoClick={handleVideoClick}
          speakClick={speakClick}
        />

        <div className="flex flex-col gap-6 w-full sm:gap-4 sm:order-3 sm:col-span-2 sm:mt-3 lg:order-2 lg:col-span-1 lg:mt-0">
          <GallerySection />
          <div className="w-full flex flex-col gap-3 mt-3 sm:mt-1 sm:gap-2">
            <DonateNow />
            <div className="w-full">
              <a
                href={pitch}
                download="Pitch Deck - Havesta"
                className="block cursor-pointer text-center rounded-3xl text-white greenbg font-bold py-4 px-2"
              >
                Download Pitch
              </a>
            </div>
          </div>
          <MissionSection
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
          />
        </div>

        <ProgressSection
          totalAmountRaised={totalAmountRaised}
          numberofdonators={numberofdonators}
          percentageraised={percentageraised}
          handleShare={handleShare}
          donators={donators.slice(0, 6)} // Show only first 6 donors
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Donation;
