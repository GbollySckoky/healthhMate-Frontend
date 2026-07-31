import React from "react";
import RadioInput from "@/components/RadioInput";
import { trackData } from "@/constants/data";
import { PageWrapper } from "@/components/Reusable";

const TrackIndex = () => {
  // NOTE: kept as a no-op to match the original — nothing actually toggles
  // selection per item yet, and `selected` below is hardcoded true for
  // every row regardless of which one is picked. Flagging in case that
  // wasn't intentional; happy to wire up real per-item selection state.
  const handleInput = () => {};

  return (
    <PageWrapper>
      {trackData.map((data, index) => {
        const { id, med, time, icon } = data;
        const isLastItem = index === trackData.length - 1;
        return (
          <div
            key={id}
            className={`pt-[15px] pb-[15px] border-b border-[#F2F2F2] ${
              isLastItem ? "border-b-0" : ""
            }`}
          >
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center">
                <span className="bg-[#FDF2FA] p-[5px] rounded-[4px] flex items-center justify-center">
                  {icon}
                </span>
                <div className="pl-[15px]">
                  <p className="font-lato font-medium text-sm">{med}</p>
                  <p className="font-lato text-[#717680] font-normal text-xs pt-[3px]">
                    {time}
                  </p>
                </div>
              </div>
              {/* <RadioInput selected={true} onPress={handleInput} /> */}
            </div>
          </div>
        );
      })}
    </PageWrapper>
  );
};

export default TrackIndex;