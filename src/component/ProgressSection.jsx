import { formatCurrency } from "../utils/helpers";
import DonateNow from "./DonateNow";
import { DonatorList } from "./DonatorList";
import ProgressCircle from "./ProgressCircle";

export const ProgressSection = ({
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
