import React from "react";
import ReactionButton from "./ReactionButton";

export const MissionStatement = ({ isExpanded, onToggleExpanded }) => (
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
