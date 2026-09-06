"use client"
import React from 'react';
import {  Loader2 } from 'lucide-react';
import {
  Card,
  CardText,
  DetailsContainer,
  SubTitle,
  Button,
  PageWrapper,
  Reading
} from '@/components/Reusable';
import { patientService } from '@/service/patientService';
import { useQuery } from '@tanstack/react-query';
import { useModal } from '@/store/Modal';
import MoodModal from './MoodModal';
import useDate from '@/hooks/useDate';
import { MoodReading } from '@/lib/interface/create-mood-interface';
import { getMoodEmoji, getMoodStatus, statusStyles } from '@/constants/mood';


const Mood = () => {
  const { openModal } = useModal();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['getmood'],
    queryFn: () => patientService.getMood(),
  });
  const {getReadableDate, formatTime} = useDate()


  const moodReadings: MoodReading[] = data?.data ?? [];
  const latestMood = moodReadings[0];
  const latestMoodName = latestMood?.mood?.selectedMood;
  const latestMoodStatus = latestMood?.status ?? getMoodStatus(latestMoodName);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin" size={36} color="#DD2590" />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="h-full flex items-center justify-center text-sm text-red-500">
        {(error as Error)?.message}
      </p>
    );
  }

  return (
    <PageWrapper>
        <div>
            <DetailsContainer>
              <p className="text-[35px] mb-[3px] leading-none">
                {getMoodEmoji(latestMoodName)}
              </p>
              <CardText>Today&apos;s mood</CardText>
              <Reading>{latestMoodName ?? 'No mood logged'}</Reading>
              <CardText>
                Recorded on:{' '}
                {getReadableDate(latestMood?.recordedAt || 'N/A')}
                {' '} at {' '}
                {formatTime(latestMood?.createdAt || 'N/A')}
              </CardText>
              <span className="text-[#027A48] bg-[#ECFDF3] rounded-full px-2.5 py-1.5 mt-[7px] inline-block w-fit text-xs font-normal">
                {latestMoodStatus}
              </span>
            </DetailsContainer>

            <div className="mb-10">
              <Card>
                <SubTitle>Recent Moods</SubTitle>
                {moodReadings.map((recent, index) => {
                  const moodName = recent.mood?.selectedMood;
                  const status = recent.status ?? getMoodStatus(moodName);
                  const isLastItem = index === moodReadings.length - 1;
                  const colors = statusStyles[status] ?? statusStyles.Logged;

                  return (
                    <div
                      key={recent.id}
                      className={`pt-[5px] border-[#F2F2F2] ${
                        isLastItem ? 'border-b-0' : 'border-b'
                      }`}
                    >
                      <div className="flex items-center justify-between py-[18px]">
                        <div className="flex items-center">
                          {recent.mood?.selectedEmoji && (
                            <span className="border border-[#f2f2f2] p-1.5 rounded-[5px]">
                              {getMoodEmoji(moodName)}
                            </span>
                          )}

                          <div className="pl-4">
                            <p  className="font-medium text-sm text-[#414651] pt-0.5">
                              {moodName ?? 'No mood'}
                            </p>
                            <p className="font-normal text-xs text-[#414651] py-1">
                              {recent.notes ?? 'No notes'}
                            </p>
                            <p className="font-normal text-xs text-[#717680] pt-0.5">
                              {getReadableDate(recent.recordedAt || 'N/A')} {' '} at {' '}
                              {formatTime(recent.createdAt || 'N/A')}
                            </p>
                          </div>
                        </div>

                        <span
                          className="px-[15px] py-[7px] rounded-full font-medium text-xs"
                          style={{ backgroundColor: colors.bg, color: colors.text }}
                        >
                          {status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </Card>
            </div>
        </div>
        <Button
          _fn={() =>
            openModal(<MoodModal />, {
              title: 'Log New Mood',
              description: '',
              onClose: () => {},
            })
          }
        >
          Log New Weight
        </Button>
    </PageWrapper>
  );
};

export default Mood;