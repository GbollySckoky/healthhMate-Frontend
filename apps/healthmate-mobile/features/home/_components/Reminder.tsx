"use client";

import React from "react";
import { ArrowRight, Check, Moon, Pill } from "lucide-react";
import { useRouter } from "next/navigation";
import { SubTitle } from "@/components/Reusable";
import { ROUTES } from "@/constants/route";

const trackData = [
  { id: "1", med: "Take Vitamin C", time: "10:55am", icon: <Pill size={24} color="black" /> },
  { id: "2", med: "Track Sleep", time: "10:55am", icon: <Moon size={24} color="#FFC847" /> },
];

export default function Reminder() {
  const router = useRouter();

  return (
    <div className="mb-[35px] mt-5">
      <div className="flex flex-row justify-between items-center mt-[10px] mb-[10px]">
        <SubTitle>Today&apos;s Reminders</SubTitle>
        <button type="button" className="flex flex-row items-center" onClick={() => router.push(ROUTES.allReminders)}>
          <span className="text-[#DD2590] font-normal text-xs">View All</span>
          <ArrowRight size={17} color="#DD2590" />
        </button>
      </div>
      <div>
        {trackData.map(({ id, med, time, icon }) => (
          <div key={id} className="pt-[15px] pb-[15px] border-b border-[#F2F2F2]">
            <div className="flex flex-row content-center justify-between">
              <div className="flex flex-row content-center">
                <span className="bg-[#FDF2FA] p-[5px] rounded">{icon}</span>
                <div className="pl-[15px]">
                  <p className="font-lato font-medium text-sm m-0">{med}</p>
                  <p className="text-[#717680] font-normal text-xs pt-[3px] m-0">{time}</p>
                </div>
              </div>
              <button type="button" aria-label={`Mark ${med} complete`} className="w-5 h-3 rounded-full border border-[#D5D7DA] flex items-center justify-center text-transparent hover:text-[#DD2590] hover:border-[#DD2590]">
                <Check size={13} strokeWidth={3} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
