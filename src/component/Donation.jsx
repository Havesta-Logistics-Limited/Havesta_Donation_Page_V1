import React, { useState } from "react";
import pitch from "../assets/PitchDeck-Havesta.pdf";

// Components
import DonateNow from "./DonateNow";
import { handleShare } from "../utils/helpers";
import { VideoPlayer } from "./VideoPlayer";
import { ImageGallery } from "./ImageGallery";
import { MissionStatement } from "./MissionStatement";
import { useVideoPlayer } from "./useVideoPlayer";
import { useDonations } from "../hooks/useDonations";

// Styles
import "./../css/Maincontent.css";
import { ProgressSection } from "./ProgressSection";

// Constants
const FUNDING_GOAL = 10000000; // ₦10M
const FOUNDER_WHATSAPP = "2347011096453";

const createWhatsAppUrl = (number, message) => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encodedMessage}`;
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
