import React from "react";
import heart from "../assets/heart.svg";
import { formatCurrency } from "../utils/helpers";

export const DonatorItem = ({ donator }) => (
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
