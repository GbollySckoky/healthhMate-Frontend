"use client"
import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, Smile, Moon, Scale, Pill } from 'lucide-react';
import { CardText, CardTitle, Reading } from '@/components/Reusable';
// import OverviewCardSkeleton from '@/components/TrackSkeleton';
import useGetOverview from '@/hooks/useGetOverview';
import useDate from '@/hooks/useDate';
import { ROUTES } from '@/constants/route';
import { OverviewCardSkeleton } from '@/components/OverviewSkeleton';

const HealthOverview = () => {
  const router = useRouter();
  const { overview, isError, isLoading, error, refetch } = useGetOverview();
  const { getReadableDate } = useDate();

  const readableDate = (value: any) => (value ? getReadableDate(value) : 'N/A');

  const handlePress = useCallback(
    (url: string) => {
      router.push(url);
    },
    [router]
  );

  const healthOverview = [
    {
      title: 'Blood Pressure',
      value: overview?.bloodPressure
        ? `${overview.bloodPressure.systolic || '-'}/${overview.bloodPressure.diastolic || '-'}mmHg`
        : 'N/A',
      text: readableDate(overview?.bloodPressure?.recordedAt),
      id: 1,
      icon: <Heart size={24} color="#DF0000" fill="#DF0000" />,
      url: ROUTES.bloodPressure,
    },
    {
      title: 'Mood',
      value: overview?.mood?.mood.selectedMood || 'N/A',
      text: readableDate(overview?.mood?.recordedAt),
      id: 2,
      icon: <Smile size={24} color="#FFC847" />,
      url: ROUTES.mood,
    },
    {
      title: 'Sleep',
      value: overview?.sleep?.sleep.selectedMood || 'N/A',
      text: readableDate(overview?.sleep?.recordedAt),
      id: 3,
      icon: <Moon size={24} color="black" />,
      url: ROUTES.sleep,
    },
    {
      title: 'Weight',
      value: overview?.weight ? `${overview.weight.weight}kg` : 'N/A',
      text: readableDate(overview?.weight?.recordedAt),
      id: 4,
      icon: <Scale size={24} color="blue" />,
      url: ROUTES.weight,
    },
    {
      title: 'Medications',
      value: overview?.medication?.name || 'N/A',
      text: overview?.medication
        ? readableDate(overview.medication.recordedAt)
        : 'No medication',
      id: 5,
      icon: <Pill size={24} color="#C11574" />,
      url: ROUTES.medication,
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-5 justify-between mb-[30px] px-[5px]">
        {[1, 2, 3, 4, 5].map((key) => (
          <OverviewCardSkeleton key={key} />
        ))}
      </div>
    );
  }

  // If the request errored but there's no data to show either way,
  // fail silently instead of surfacing an error/retry card.
  if (isError && !overview) {
    return null;
  }

  if (isError) {
    return (
      <div className="p-4 flex flex-col items-center justify-center min-h-[120px] border border-[#F1F1F1] rounded-[10px] bg-white mb-[15px]">
        <p className="text-sm text-[#B42318] text-center font-normal">
          {error?.message || 'Unable to load health overview'}
        </p>
        <button
          onClick={() => refetch()}
          className="bg-[#DD2590] rounded-lg mt-3 px-[18px] py-2"
        >
          <span className="text-white font-semibold text-[13px]">Retry</span>
        </button>
      </div>
    );
  }

  // {!hasOverviewData && (
  //   <div className="p-4 flex flex-col items-center justify-center min-h-[120px] border border-[#F1F1F1] rounded-[10px] bg-white mb-[15px]">
  //     <p className="text-sm text-[#414651] mt-2 text-center">No health overview yet</p>
  //     <p className="text-xs text-[#717680] mt-1 text-center">
  //       Track your health activities to see them here.
  //     </p>
  //   </div>
  // )}

  return (
    <div className="flex flex-wrap justify-between mb-[30px] px-[5px]">
      {healthOverview.map((health) => {
        const { title, id, text, value, icon, url } = health;
        return (
          <button
            key={id}
            onClick={() => handlePress(url)}
            aria-label={`${title}: ${value}`}
            title={`Navigate to ${title} details`}
            className="
              w-[48%] min-h-[120px] p-[15px] mb-[15px]
              border border-[#F1F1F1] rounded-[10px] bg-white
              text-left transition-all duration-150
              active:opacity-70 active:bg-[#F8F8F8] active:scale-[0.98]
              hover:shadow-sm
            "
          >
            <div className="pb-[15px]">{icon}</div>
            <CardTitle>{title}</CardTitle>
            <div className="flex flex-col justify-end flex-1">
              <Reading>
                {value}
              </Reading>
              <CardText>{text}</CardText>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default HealthOverview;