import React from "react";
import { DonatorItem } from "./DonatorItem";
import { LoadingSkeleton } from "./LoadingSkeleton";

export const DonatorList = ({ donators, loading }) => {
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
