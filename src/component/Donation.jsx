import React, { useState, useRef, useEffect } from "react";
import { FaPlay } from "react-icons/fa";

// Assets imports
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

// Components
import DonateNow from "./DonateNow";
import ReactionButton from "./ReactionButton";

// Styles and utilities
import "./../css/Maincontent.css";
import { getDonations } from "../lib/firebase/firebase";

// Constants
const FUNDING_GOAL = 10000000; // ₦10M
const FOUNDER_WHATSAPP = "2347011096453";
const GALLERY_IMAGES = [
  rectangle1,
  rectangle2,
  rectangle3,
  rectangle4,
  rectangle5,
  rectangle6,
];

// Utility Functions
const getTimeAgo = (timestamp) => {
  const now = new Date();
  const donationTime = timestamp.toDate
    ? timestamp.toDate()
    : new Date(timestamp);
  const diffTime = Math.abs(now - donationTime);

  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffTime / (1000 * 60));

  if (diffDays > 0) return `${diffDays} d`;
  if (diffHours > 0) return `${diffHours} hrs`;
  if (diffMinutes > 0) return `${diffMinutes} min`;
  return "just now";
};

const formatCurrency = (amount) => `₦${amount.toLocaleString()}`;

const createWhatsAppUrl = (number, message) => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encodedMessage}`;
};

// Sub Components
const VideoPlayer = ({ videoRef, isPlaying, onVideoClick, onSpeakClick }) => (
  <div className="w-full sm:order-1 h-full sm:flex sm:flex-col sm:justify-center">
    <div className="relative max-w-sm flex flex-col items-center justify-center w-full m-auto z-50">
      <video
        ref={videoRef}
        className="w-full max-w-3xl rounded-2xl shadow-lg cursor-pointer m-auto"
        onClick={onVideoClick}
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
          onClick={onVideoClick}
        >
          <FaPlay className="text-6xl text-white" />
        </div>
      )}
    </div>

    <button
      className="lightgreenbg text-[#273f2b] font-bold rounded-3xl py-5 flex items-center justify-center text-center gap-2 w-[80%] px-2 m-auto mt-4 cursor-pointer sm:text-sm lg:w-[80%]"
      onClick={onSpeakClick}
    >
      <img src={whatsapp} alt="WhatsApp" className="w-7 sm:w-6" />
      <span>Speak With The Founder</span>
    </button>
  </div>
);

const ImageGallery = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 gap-0">
    {GALLERY_IMAGES.map((image, index) => (
      <img
        key={index}
        src={image}
        alt={`Gallery image ${index + 1}`}
        className="w-full"
      />
    ))}
  </div>
);

const MissionStatement = ({ isExpanded, onToggleExpanded }) => (
  <div className="text-[#232323] mt-3 sm:mt-1">
    <h3 className="font-bold text-sm mb-4">Our Mission (Why Donate?)</h3>

    <div
      className={`text-base leading-relaxed mb-3 ${
        !isExpanded ? "line-clamp-[14] sm:line-clamp-[8]" : ""
      }`}
    >
      <p>
        It's important to build <strong>Havesta</strong> because we see a
        massive gap between food production and consumer access in Africa — one
        that directly impacts{" "}
        <strong>farmer incomes, food quality, and community health</strong>.
      </p>

      <p className="mt-2">
        By creating a reliable platform that connects farmers and vendors
        directly to customers, we are addressing{" "}
        <strong>
          post-harvest losses, unfair middleman practices, and inconsistent
          product quality
        </strong>
        .
      </p>

      <p className="mt-2">
        For me, this isn't just a business;{" "}
        <span className="font-bold text-[#02A95C]">
          it's a mission to empower local farmers, make fresh and healthy food
          easily accessible, and create a sustainable supply chain that benefits
          everyone
        </span>
        .
      </p>

      <p className="mt-2">
        The agricultural sector in Nigeria has enormous untapped potential, and{" "}
        <strong>
          Havesta is our way of unlocking it through technology, logistics, and
          trust
        </strong>
        . Ultimately, building Havesta is about solving a real problem that
        affects millions, while creating lasting economic and social impact.
      </p>

      <p className="font-bold mt-2">
        Download the Pitch to get more information.
      </p>
    </div>

    <button
      onClick={onToggleExpanded}
      className="cursor-pointer text-[#232323] underline w-fit"
    >
      {isExpanded ? "Read Less" : "Read More"}
    </button>

    <ReactionButton />
  </div>
);

const LoadingSkeleton = () => (
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

const DonatorItem = ({ donator }) => (
  <div className="flex items-center gap-3 w-fit pr-8">
    <img src={heart} alt="Heart" className="w-14" />
    <div className="flex flex-col gap-1 w-36">
      <h4 className="text-[#232323] text-lg sm:text-base">
        {donator.name || "Anonymous"}
      </h4>
      <div className="flex items-center gap-2 text-sm">
        <span className="text-[#232323] font-bold">
          {formatCurrency(donator.amount)}
        </span>
        <span className="text-[#232323] -mt-1">.</span>
        <span className="text-[#232323]">{donator.timeAgo}</span>
      </div>
    </div>
  </div>
);

const DonatorList = ({ donators, loading }) => {
  if (loading) return <LoadingSkeleton />;

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
        <DonatorItem key={donator.id} donator={donator} />
      ))}
    </div>
  );
};

const ProgressCircle = ({ percentage }) => (
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
        strokeDashoffset={2 * Math.PI * 36 * (1 - percentage)}
        strokeLinecap="round"
        transform="rotate(-90 40 40)"
      />
    </svg>
    <span className="absolute text-lg">{(percentage * 100).toFixed(1)}%</span>
  </div>
);

const ProgressSection = ({
  stats,
  onShare,
  donators,
  loading,
  onToggleTopDonators,
  showTopDonators,
}) => {
  const { totalAmountRaised, numberOfDonators, percentageRaised } = stats;

  return (
    <div className="border rounded-3xl shadow-[-5px_5px_16px_-2px_rgba(0,0,0,0.2),5px_-5px_16px_2px_rgba(0,0,0,0.2)] w-full py-6 px-4 mt-5 sm:order-2 sm:mt-0 lg:order-3 lg:rounded-md">
      {/* Progress Header */}
      <div className="flex justify-between items-center">
        <div className="w-[200px] flex flex-col gap-1 lg:w-[180px]">
          <h2 className="text-[#232323] font-bold text-xl sm:text-lg">
            {formatCurrency(totalAmountRaised)}
            <span className="font-normal ml-2">Raised</span>
          </h2>
          <div className="font-bold flex justify-between items-center text-sm sm:text-xs">
            <span className="textgreen">10M Goal</span>
            <span className="text-[#6F6F6F] -mt-1">.</span>
            <span className="text-[#6F6F6F]">{numberOfDonators} donations</span>
          </div>
        </div>

        <ProgressCircle percentage={percentageRaised} />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 mt-4">
        <button
          className="cursor-pointer text-center rounded-3xl text-white greenbg font-bold py-4 px-2"
          onClick={onShare}
        >
          Share now
        </button>
        <div className="cta-button donate-btn">
          <DonateNow />
        </div>
      </div>

      <DonatorList donators={donators} loading={loading} />

      <button
        className="text-[#232323] font-bold text-lg border border-[#B7B7B6] w-full text-center py-3 rounded-3xl justify-center"
        onClick={onToggleTopDonators}
      >
        {showTopDonators ? "See Recent Donators" : "See Top Donators"}
      </button>
    </div>
  );
};

// Custom Hooks
const useVideoPlayer = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

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

  return { videoRef, isPlaying, handleVideoClick };
};

const useDonations = () => {
  const [donators, setDonators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        setLoading(true);
        const donations = await getDonations();

        const transformedDonations = donations.map((donation) => ({
          id: donation.id,
          name: donation.name?.split(" ")[0] || "Anonymous",
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
        setDonators([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  return { donators, loading, error };
};

// Main Component
const Donation = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showTopDonators, setShowTopDonators] = useState(false);

  // Custom hooks
  const { videoRef, isPlaying, handleVideoClick } = useVideoPlayer();
  const { donators, loading } = useDonations();

  // Calculated values
  const stats = {
    numberOfDonators: donators.length,
    totalAmountRaised: donators.reduce(
      (acc, item) => acc + (item.amount || 0),
      0
    ),
    percentageRaised: Math.min(
      donators.reduce((acc, item) => acc + (item.amount || 0), 0) /
        FUNDING_GOAL,
      1
    ),
  };

  // Donators list logic
  const displayedDonators = showTopDonators
    ? [...donators].sort((a, b) => b.amount - a.amount).slice(0, 6) // top 6
    : donators.slice(0, 6); // recent 6

  // Event handlers
  const handleShare = () => {
    const message = `Havesta is currently crowdfunding to bring our MVP to life 🚀.  
With your support, we can create a digital product that connects farmers directly to customers—making Fresh Farm Produce, Healthy Livestock, and other Agri-Inputs accessible to all while transforming agriculture in Nigeria.  

✨ Every donation makes a difference.  

📢 Please Donate today & help share this with your friends!  

Check it out here: https://havesta.com/donation`;

    const whatsappUrl = createWhatsAppUrl("", message);
    window.open(whatsappUrl, "_blank");
  };

  const handleSpeakWithFounder = () => {
    const message = "Hello, I'd like to learn more about Havesta.";
    const whatsappUrl = createWhatsAppUrl(FOUNDER_WHATSAPP, message);
    window.open(whatsappUrl, "_blank");
  };

  const handleToggleExpanded = () => setIsExpanded(!isExpanded);
  const handleToggleTopDonators = () => setShowTopDonators(!showTopDonators);

  return (
    <div className="bg-white flex flex-col items-center px-6 py-8 md:px-9 lg:px-11">
      <h1 className="text-[#232323] font-bold text-xl mb-6 text-center sm:mb-9">
        HELP BRING OUR MVP TO LIVE BY DONATING
      </h1>

      <div className="flex flex-col gap-8 items-center sm:grid sm:grid-cols-2 sm:items-start md:grid-cols-[360px_1fr] lg:grid-cols-[25%_40%_30%]">
        <VideoPlayer
          videoRef={videoRef}
          isPlaying={isPlaying}
          onVideoClick={handleVideoClick}
          onSpeakClick={handleSpeakWithFounder}
        />

        <div className="flex flex-col gap-6 w-full sm:gap-4 sm:order-3 sm:col-span-2 sm:mt-3 lg:order-2 lg:col-span-1 lg:mt-0">
          <ImageGallery />

          <div className="w-full flex flex-col gap-3 mt-3 sm:mt-1 sm:gap-2">
            <DonateNow />
            <a
              href={pitch}
              download="Pitch Deck - Havesta"
              className="block cursor-pointer text-center rounded-3xl text-white greenbg font-bold py-4 px-2"
            >
              Download Pitch
            </a>
          </div>

          <MissionStatement
            isExpanded={isExpanded}
            onToggleExpanded={handleToggleExpanded}
          />
        </div>

        <ProgressSection
          stats={stats}
          onShare={handleShare}
          donators={displayedDonators}
          loading={loading}
          onToggleTopDonators={handleToggleTopDonators}
          showTopDonators={showTopDonators}
        />
      </div>
    </div>
  );
};

export default Donation;
