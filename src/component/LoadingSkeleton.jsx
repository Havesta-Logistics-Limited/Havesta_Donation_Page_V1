import React from "react";

export const LoadingSkeleton = () => (
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
