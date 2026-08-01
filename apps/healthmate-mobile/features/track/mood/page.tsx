"use client"
import React, { useState } from 'react';
import {  Loader2 } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  Card,
  CardAmount,
  CardText,
  DetailsContainer,
  SubTitle,
  Button,
  PageWrapper
} from '@/components/Reusable';
import { patientService } from '@/service/patientService';
import { useQuery } from '@tanstack/react-query';
import { useModal } from '@/store/Modal';
import { useRouter } from 'next/navigation';
import MoodModal from './MoodModal';

type MoodValue = {
  selectedMood?: string;
  selectedEmoji?: boolean;
};

type MoodReading = {
  id: number | string;
  mood?: MoodValue;
  notes?: string;
  recordedAt?: string;
  createdAt?: string;
  status?: string;
};

const formatReadingDate = (date?: string) => {
  if (!date) return 'No date recorded';

  const readingDate = new Date(date);
  if (Number.isNaN(readingDate.getTime())) return 'No date recorded';

  return `${readingDate.toLocaleDateString()} at ${readingDate.toLocaleTimeString()}`;
};

const getMoodEmoji = (mood?: string) => {
  switch (mood) {
    case 'Happy':
      return '🙂';
    case 'Laughing':
      return '😂';
    case 'Angry':
      return '😡';
    case 'Sick':
      return '🤢';
    case 'Tired':
      return '🥱';
    default:
      return '🙂';
  }
};

const getMoodStatus = (mood?: string) => {
  if (mood === 'Happy' || mood === 'Laughing') return 'Positive';
  if (mood === 'Angry' || mood === 'Sick' || mood === 'Tired') return 'Low';
  return 'Logged';
};

// ---------- Status badge color mapping ----------

const statusStyles: Record<string, { bg: string; text: string }> = {
  Positive: { bg: '#ECFDF3', text: '#027A48' },
  Low: { bg: '#FEF3F2', text: '#B42318' },
  Balanced: { bg: '#FFFAEB', text: '#B54708' },
  Logged: { bg: '#F4F3FF', text: '#5924DC' },
};

const Mood = () => {
  const router = useRouter();
  const { openModal } = useModal();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['getmood'],
    queryFn: () => patientService.getMood(),
  });

  const moodReadings: MoodReading[] = data?.data ?? [];
  const latestMood = moodReadings[0];
  const latestMoodName = latestMood?.mood?.selectedMood;
  const latestMoodStatus = latestMood?.status ?? getMoodStatus(latestMoodName);

  const [readings] = useState([
    { date: 'Jun 20', systolic: 82, diastolic: 62 },
    { date: 'Jun 21', systolic: 95, diastolic: 75 },
    { date: 'Jun 22', systolic: 118, diastolic: 105 },
    { date: 'Jun 23', systolic: 118, diastolic: 95 },
    { date: 'Jun 24', systolic: 140, diastolic: 82 },
    { date: 'Jun 25', systolic: 140, diastolic: 82 },
    { date: 'Jun 26', systolic: 140, diastolic: 82 },
    { date: 'Jun 27', systolic: 140, diastolic: 82 },
  ]);

  const chartData = readings.map((r) => ({
    date: r.date.split(' ')[1],
    systolic: r.systolic,
    diastolic: r.diastolic,
  }));

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
              <CardText>Today's mood</CardText>
              <CardAmount>{latestMoodName ?? 'No mood logged'}</CardAmount>
              <CardText>
                Recorded on:{' '}
                {formatReadingDate(latestMood?.recordedAt ?? latestMood?.createdAt)}
              </CardText>
              <span className="text-[#027A48] bg-[#ECFDF3] rounded-full px-2.5 py-1.5 font-medium mt-[7px] inline-block w-fit">
                {latestMoodStatus}
              </span>
            </DetailsContainer>

            {/* Chart */}
            <div className="bg-white mb-[26px] mt-[25px] rounded-xl p-3 shadow-sm border border-[#f2f2f2]">
              <SubTitle>Mood Trends</SubTitle>
              <div className="w-full my-2" style={{ height: 220 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid
                      strokeDasharray="5 5"
                      stroke="rgba(229, 231, 235, 1)"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="date"
                      stroke="rgba(107, 114, 128, 1)"
                      tick={{ fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      stroke="rgba(107, 114, 128, 1)"
                      tick={{ fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="systolic"
                      stroke="rgba(239, 68, 68, 1)"
                      strokeWidth={3}
                      dot={{ r: 4, strokeWidth: 0 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="diastolic"
                      stroke="rgba(59, 130, 246, 1)"
                      strokeWidth={3}
                      dot={{ r: 4, strokeWidth: 0 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

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
                            <p className="font-medium text-sm">
                              {moodName ?? 'No mood'}
                            </p>
                            <p className="font-medium text-sm">
                              {recent.notes ?? 'No notes'}
                            </p>
                            <p className="font-normal text-xs text-[#717680] pt-0.5">
                              {formatReadingDate(recent.recordedAt ?? recent.createdAt)}
                            </p>
                          </div>
                        </div>

                        <span
                          className="px-[15px] py-[7px] rounded-full font-medium"
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