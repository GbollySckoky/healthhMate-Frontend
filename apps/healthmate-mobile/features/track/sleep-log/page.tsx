"use client";
import React from "react";
import { Moon } from "lucide-react";
import {
  Card,
  // CardAmount,
  CardText,
  DetailsContainer,
  PageWrapper,
  SubTitle,
  Button,
  Reading
} from "@/components/Reusable";
import { patientService } from "@/service/patientService";
import { useQuery } from "@tanstack/react-query";
import { useModal } from "@/store/Modal";
import SleepModal from "./SleepModal";
import { SleepReading } from "@/lib/interface/create-sleep-interface";
import { SleepSkeleton } from "@/components/SleepSkeleton";
import useDate from "@/hooks/useDate";

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

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  Excellent: { bg: "#ECFDF3", text: "#027A48" },
  Average: { bg: "#FFFAEB", text: "#B54708" },
  Low: { bg: "#FEF3F2", text: "#B42318" },
  Logged: { bg: "#F4F3FF", text: "#5924DC" },
};
const getStatusColors = (status: string) => STATUS_COLORS[status] ?? STATUS_COLORS.Logged;


export default function SleepTrackerPage() {
  const { openModal } = useModal();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getSleep"],
    queryFn: () => patientService.getSleep(),
  });

  const {formatReadingDate} = useDate()
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
              <Reading>{latestSleepQuality ?? "No sleep logged"}</Reading>
              <CardText>
                Recorded on:{" "}
                {formatReadingDate(latestSleep?.recordedAt ?? latestSleep?.createdAt)}
              </CardText>
              {/* <span className="text-[#027A48] bg-[#ECFDF3] rounded-full px-2.5 py-1.5 font-inter-medium mt-1.5 inline-block">
                {latestSleepStatus}
              </span> */}
            </DetailsContainer>

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