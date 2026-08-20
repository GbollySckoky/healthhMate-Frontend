"use client";
import { CardTitle, MinCard, SubTitle } from "@/components/Reusable";
import React, { ReactNode, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Heart, Smile, Moon, Scale, Pill } from "lucide-react";
// import { ROUTES } from "@/lib/routes";
import useDate from "@/hooks/useDate";
import useGetOverview from "@/hooks/useGetOverview";
import { ROUTES } from "@/constants/route";
// import { useOverview } from "@/context/getOverviewContext";

type HealthOverviewItem = {
  id: number;
  title: string;
  value: string;
  text: string;
  icon: ReactNode;
  url: string;
};

/* ---------- Skeleton primitives ---------- */

const SkeletonBlock = ({
  width,
  height,
  rounded = "rounded-md",
  className = "",
}: {
  width: number | `${number}%`;
  height: number;
  rounded?: string;
  className?: string;
}) => (
  <div
    className={`bg-gray-200 animate-pulse ${rounded} ${className}`}
    style={{
      width: typeof width === "number" ? `${width}px` : width,
      height: `${height}px`,
    }}
  />
);

const OverviewCardSkeleton = () => (
  <MinCard className="p-[15px] border border-[#F1F1F1] rounded-[10px] bg-white mb-[10px] w-[200px] shrink-0">
    <SkeletonBlock width={24} height={24} rounded="rounded-full" className="mb-[15px]" />
    <SkeletonBlock width="70%" height={13} />
    <div className="pt-1">
      <SkeletonBlock width="50%" height={20} className="mb-2" />
      <SkeletonBlock width="40%" height={12} />
    </div>
  </MinCard>
);


const Activities = () => {
  const router = useRouter();
  const { overview, isError, isLoading, error, refetch } = useGetOverview();
  const { getReadableDate } = useDate();

  const hasOverviewData = Boolean(
    overview?.bloodPressure ||
      overview?.mood ||
      overview?.sleep ||
      overview?.weight ||
      overview?.medication
  );

  const readableDate = (value?: string | null) =>
    value ? getReadableDate(value) : "N/A";

  const healthOverview: HealthOverviewItem[] = [
    {
      title: "Blood Pressure",
      value: overview?.bloodPressure
        ? `${overview.bloodPressure.systolic || "-"}/${overview.bloodPressure.diastolic || "-"}mmHg`
        : "N/A",
      text: readableDate(overview?.bloodPressure?.recordedAt),
      id: 1,
      icon: <Heart size={24} color="#DF0000" />,
      url: ROUTES.bloodPressure,
    },
    {
      title: "Mood",
      value: overview?.mood?.mood.selectedMood || "N/A",
      text: readableDate(overview?.mood?.recordedAt),
      id: 2,
      icon: <Smile size={24} color="#FFC847" />,
      url: ROUTES.mood,
    },
    {
      title: "Sleep",
      value: overview?.sleep?.sleep.selectedMood || "N/A",
      text: readableDate(overview?.sleep?.recordedAt),
      id: 3,
      icon: <Moon size={24} color="black" />,
      url: ROUTES.sleep,
    },
    {
      title: "Weight",
      value: overview?.weight ? `${overview.weight.weight}kg` : "N/A",
      text: readableDate(overview?.weight?.recordedAt),
      id: 4,
      icon: <Scale size={24} color="blue" />,
      url: ROUTES.weight,
    },
    {
      title: "Medications",
      value: overview?.medication?.name || "N/A",
      text: overview?.medication
        ? readableDate(overview.medication.recordedAt)
        : "No medication",
      id: 5,
      icon: <Pill size={24} color="#C11574" />,
      url: ROUTES.medication,
    },
  ];

  const handlePress = useCallback(
    (url: string) => {
      router.push(url);
    },
    [router]
  );

  const renderLoadingState = () => (
    <div className="flex flex-row gap-3 overflow-x-auto pb-1">
      {[1, 2, 3, 4, 5].map((key) => (
        <OverviewCardSkeleton key={key} />
      ))}
    </div>
  );

  const renderErrorState = () => (
    <div className="flex flex-col items-center justify-center min-h-[120px] p-4 border border-[#F1F1F1] rounded-[10px] bg-white mt-[10px] mb-[10px]">
      <p className="font-lato text-[#B42318] text-sm text-center">
        {error?.message || "Unable to load health overview"}
      </p>
      <button
        type="button"
        onClick={() => refetch()}
        className="bg-[#DD2590] rounded-lg mt-3 px-[18px] py-2"
      >
        <span className="font-inter-semibold text-white text-[13px]">Retry</span>
      </button>
    </div>
  );

  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center min-h-[120px] p-4 border border-[#F1F1F1] rounded-[10px] bg-white mt-[10px] mb-[10px]">
      <span className="font-lato text-[#414651] text-sm mt-2 text-center">
        No health overview yet
      </span>
      <p className="font-lato text-[#717680] text-xs mt-1 text-center">
        Track your health activities to see them here.
      </p>
    </div>
  );

  const renderOverviewCards = () => (
    <div className="flex flex-row gap-3 overflow-x-auto pb-1 mt-2">
      {healthOverview.map((health) => {
        const { title, id, text, value, icon, url } = health;
        return (
          <button
            type="button"
            onClick={() => handlePress(url)}
            key={id}
            aria-label={`${title}: ${value}`}
            title={`Navigate to ${title} tracker`}
            className="text-left shrink-0 active:opacity-75 transition-opacity"
          >
            <MinCard className="p-[15px] border border-borderColor10 rounded-md bg-white w-[200px]">
              <div className="pb-[10px]">{icon}</div>
              <CardTitle>{title}</CardTitle>
              <div>
                <p className="block text-base font-semibold text-[#414651] font-libre">{value}</p>
                <p className="font-inter text-[10px] text-[#717680] font-normal pt-1">{text}</p>
              </div>
            </MinCard>
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="mt-5">
      <SubTitle>Your Health Overview</SubTitle>
      {isLoading && renderLoadingState()}
      {isError && renderErrorState()}
      {!isLoading && !isError && !hasOverviewData && renderEmptyState()}
      {!isLoading && !isError && hasOverviewData && renderOverviewCards()}
    </div>
  );
};

export default Activities;