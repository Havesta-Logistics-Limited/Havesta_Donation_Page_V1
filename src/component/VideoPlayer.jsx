import React from "react";
import { FaPlay } from "react-icons/fa";
import whatsapp from "../assets/whatsapp.svg";

// Sub Components
export const VideoPlayer = ({
  videoRef,
  isPlaying,
  onVideoClick,
  onSpeakClick,
}) => (
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
        <source
          src="https://res.cloudinary.com/dtc89xi2r/video/upload/v1756475215/Havesta_Pitch_1_rfsalp.mp4"
          type="video/mp4"
        />
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
