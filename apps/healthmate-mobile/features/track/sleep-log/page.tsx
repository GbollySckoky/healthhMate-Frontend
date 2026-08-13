"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Moon } from "lucide-react";
// import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  Card,
  CardAmount,
  CardText,
  DetailsContainer,
  PageWrapper,
  SubTitle,
  Button
} from "@/components/Reusable";
// import SleepModal from "./_components/SleepModal";
// import { useModal } from "@/context/ModalContext";
import { patientService } from "@/service/patientService";
import { useQuery } from "@tanstack/react-query";
import { useModal } from "@/store/Modal";
import SleepModal from "./SleepModal";

type SleepValue = {
  selectedMood?: string;
  selectedEmoji?: boolean;
};

type SleepReading = {
  id: number | string;
  sleep?: SleepValue;
  recordedAt?: string;
  createdAt?: string;
  status?: string;
};

const formatReadingDate = (date?: string) => {
  if (!date) return "No date recorded";
  const readingDate = new Date(date);
  if (Number.isNaN(readingDate.getTime())) return "No date recorded";
  return `${readingDate.toLocaleDateString()} at ${readingDate.toLocaleTimeString()}`;
};

const getSleepEmoji = (sleepQuality?: string) => {
  switch (sleepQuality) {
    case "Excellent":
      return "😴";
    case "Average":
      return "😐";
    case "Poor":
      return "😩";
    default:
      return "🌙";
  }
};

const getSleepStatus = (sleepQuality?: string) => {
  if (sleepQuality === "Excellent") return "Excellent";
  if (sleepQuality === "Average") return "Average";
  if (sleepQuality === "Poor") return "Low";
  return "Logged";
};

// status -> {bg, text} lookup. Replaces the original's
// `${(status === 'X' && '#hex') || ...}` chain, which silently rendered
// the literal string "false" as a CSS color for any unmatched status.
const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  Excellent: { bg: "#ECFDF3", text: "#027A48" },
  Average: { bg: "#FFFAEB", text: "#B54708" },
  Low: { bg: "#FEF3F2", text: "#B42318" },
  Logged: { bg: "#F4F3FF", text: "#5924DC" },
};
const getStatusColors = (status: string) => STATUS_COLORS[status] ?? STATUS_COLORS.Logged;


const SkeletonBox = ({
  width,
  height,
  rounded = "rounded-md",
  className = "",
}: {
  width: number | string;
  height: number;
  rounded?: string;
  className?: string;
}) => (
  <div
    className={`bg-gray-200 animate-pulse ${rounded} ${className}`}
    style={{ width: typeof width === "number" ? `${width}px` : width, height: `${height}px` }}
  />
);

const SleepLogSkeletonItem = ({ isLastItem }: { isLastItem: boolean }) => (
  <div className={`pt-[5px] border-b border-[#F2F2F2] ${isLastItem ? "border-b-0" : ""}`}>
    <div className="flex flex-row items-center justify-between py-[18px]">
      <div className="flex flex-row items-center">
        <SkeletonBox width={36} height={36} rounded="rounded-lg" />
        <div className="pl-4">
          <SkeletonBox width={90} height={14} className="mb-1.5" />
          <SkeletonBox width={130} height={12} />
        </div>
      </div>
      <SkeletonBox width={70} height={28} rounded="rounded-full" />
    </div>
  </div>
);

const SleepSkeleton = () => (
  <PageWrapper>
    <DetailsContainer>
      <SkeletonBox width={48} height={48} rounded="rounded-full" className="mb-2.5" />
      <SkeletonBox width={100} height={12} className="mb-2" />
      <SkeletonBox width={140} height={22} className="mb-2.5" />
      <SkeletonBox width={180} height={12} className="mb-2.5" />
      <SkeletonBox width={70} height={20} rounded="rounded-full" />
    </DetailsContainer>

    <div className="flex flex-col justify-center items-center mb-5 py-[5px] flex-1">
      <div className="bg-white rounded-xl p-[15px] shadow-[0_2px_4px_rgba(0,0,0,0.1)] w-full">
        <SkeletonBox width={130} height={14} className="mb-[15px]" />
        <SkeletonBox width="100%" height={300} rounded="rounded-lg" />
      </div>
    </div>

    <div className="mb-10">
      <Card>
        <SkeletonBox width={160} height={14} className="mb-[15px]" />
        {Array.from({ length: 4 }).map((_, index) => (
          <SleepLogSkeletonItem key={index} isLastItem={index === 3} />
        ))}
      </Card>
    </div>
  </PageWrapper>
);

/* ---------- Main screen ---------- */

export default function SleepTrackerPage() {
  const router = useRouter();
  const { openModal } = useModal();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getSleep"],
    queryFn: () => patientService.getSleep(),
  });

  const sleepReadings: SleepReading[] = data?.data ?? [];
  const latestSleep = sleepReadings[0];
  const latestSleepQuality = latestSleep?.sleep?.selectedMood;
  // const latestSleepStatus = latestSleep?.status ?? getSleepStatus(latestSleepQuality);

  if (isError) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-sm text-red-500">{(error as Error).message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-[#F2F2F2] px-4 py-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Go back"
            className="p-1 -ml-1 rounded-md hover:bg-gray-100"
          >
            <ChevronLeft size={24} color="black" />
          </button>
          <div>
            <h1 className="font-semibold text-base text-black">Sleep Tracker</h1>
            <p className="text-xs text-[#717680]">
              Track your readings to monitor your heart health
            </p>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <SleepSkeleton />
        ) : (
          <PageWrapper>
            <DetailsContainer>
              <span className="bg-[#FDF2FA] px-[15px] py-[13px] rounded-full mb-2.5 inline-flex">
                <Moon size={24} color="#C11574" />
              </span>
              <CardText>Today&apos;s sleep</CardText>
              <CardAmount>{latestSleepQuality ?? "No sleep logged"}</CardAmount>
              <CardText>
                Recorded on:{" "}
                {formatReadingDate(latestSleep?.recordedAt ?? latestSleep?.createdAt)}
              </CardText>
              {/* <span className="text-[#027A48] bg-[#ECFDF3] rounded-full px-2.5 py-1.5 font-inter-medium mt-1.5 inline-block">
                {latestSleepStatus}
              </span> */}
            </DetailsContainer>

            {/* <div className="flex flex-col justify-center items-center mb-5 py-[5px] flex-1">
              <div className="bg-white rounded-xl p-[15px] shadow-[0_2px_4px_rgba(0,0,0,0.1)] w-full">
                <SubTitle>Sleep Trends</SubTitle>
                <div className="mt-2" style={{ width: "100%", height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} barCategoryGap="30%">
                      <CartesianGrid strokeDasharray="5 5" stroke="#e0e0e0" vertical={false} />
                      <XAxis
                        dataKey="month"
                        tick={{ fontSize: 12, fill: "#808080" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fontSize: 12, fill: "#808080" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Bar dataKey="value" fill="#B9552D" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div> */}

            <div className="mb-10">
              <Card>
                <SubTitle>Sleep Log History</SubTitle>
                {sleepReadings.map((sleep, index) => {
                  const sleepQuality = sleep.sleep?.selectedMood;
                  const status = sleep.status ?? getSleepStatus(sleepQuality);
                  const isLastItem = index === sleepReadings.length - 1;
                  const { bg, text } = getStatusColors(status);

                  return (
                    <div
                      key={sleep.id}
                      className={`pt-[5px] border-b border-[#F2F2F2] ${
                        isLastItem ? "border-b-0" : ""
                      }`}
                    >
                      <div className="flex flex-row items-center justify-between py-[18px]">
                        <div className="flex flex-row items-center">
                          {sleep.sleep?.selectedEmoji && (
                            <span className="border border-[#f2f2f2] p-1.5 rounded-[5px]">
                              {getSleepEmoji(sleepQuality)}
                            </span>
                          )}
                          <div className="pl-4">
                            <p className="font-lato font-medium text-sm text-[#414651] pt-0.5">
                              {sleepQuality ?? "No quality"}
                            </p>
                            <p className="font-lato font-normal text-xs text-[#717680] pt-0.5">
                              {formatReadingDate(sleep.recordedAt ?? sleep.createdAt)}
                            </p>
                          </div>
                        </div>
                        <span
                          className="font-inter text-sm font-normal px-[15px] py-[7px] rounded-full"
                          style={{ backgroundColor: bg, color: text }}
                        >
                          {status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </Card>
            </div>
          </PageWrapper>
        )}
      </div>

      <div className="sticky bottom-0 bg-white border-t border-[#F2F2F2] p-4">
        <Button
          _fn={() =>
            openModal(<SleepModal />, {
              title: "Log Your Sleep",
              description: "",
              onClose: () => {},
            })
          }
        >
          Log New Sleep
        </Button>
      </div>
    </div>
  );
}