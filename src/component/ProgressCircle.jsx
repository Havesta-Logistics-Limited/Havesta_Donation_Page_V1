import React from "react";

export const ProgressCircle = ({ percentage }) => (
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

export default ProgressCircle;
