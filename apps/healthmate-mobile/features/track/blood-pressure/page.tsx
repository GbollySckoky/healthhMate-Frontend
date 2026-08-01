"use client"
import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
import {  Heart, Stethoscope } from 'lucide-react';
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
    Button,
  Card,
  CardAmount,
  CardText,
  DetailsContainer,
  PageWrapper,
  SubTitle,
} from '@/components/Reusable';
// import { Button } from '@/components/button/Button';
// import BloodPressureModal from './BloodPressureModal';
// import { useModal } from '@/context/ModalContext';
import { useQuery } from '@tanstack/react-query';
import { patientService } from '@/service/patientService';
import { useModal } from '@/store/Modal';
import BloodPressureModal from './BloodPressureModal';

type BloodPressureReading = {
  id: number | string;
  systolic: string | number;
  diastolic: string | number;
  createdAt?: string;
  recordedAt?: string;
};

const formatReadingDate = (date?: string) => {
  if (!date) return 'No date recorded';

  const readingDate = new Date(date);
  if (Number.isNaN(readingDate.getTime())) return 'No date recorded';

  return `${readingDate.toLocaleDateString()} at ${readingDate.toLocaleTimeString()}`;
};

// ---------- Window width hook (web replacement for useWindowDimensions) ----------

const useWindowWidth = () => {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 375
  );

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
};

// ---------- Skeleton primitives ----------

type SkeletonBoxProps = {
  width: number | string;
  height: number;
  borderRadius?: number;
  className?: string;
};

const SkeletonBox = ({
  width,
  height,
  borderRadius = 6,
  className = '',
}: SkeletonBoxProps) => (
  <div
    className={`bg-gray-200 animate-pulse ${className}`}
    style={{
      width,
      height,
      borderRadius,
    }}
  />
);

const ReadingSkeletonItem = ({ isLastItem }: { isLastItem: boolean }) => (
  <div
    className={`pt-[5px] border-[#F2F2F2] ${
      isLastItem ? 'border-b-0' : 'border-b'
    }`}
  >
    <div className="flex items-center justify-between py-[18px]">
      <div className="flex items-center">
        <SkeletonBox width={38} height={38} borderRadius={8} />
        <div className="pl-4">
          <SkeletonBox width={100} height={14} className="mb-1.5" />
          <SkeletonBox width={130} height={12} />
        </div>
      </div>
    </div>
  </div>
);

const BloodPressureSkeleton = ({
  chartWidth,
  chartHeight,
}: {
  chartWidth: number;
  chartHeight: number;
}) => (
  <div className="self-center w-[92%] mx-auto pt-[10px] pb-[110px]">
    <DetailsContainer>
      <SkeletonBox width={48} height={48} borderRadius={100} className="mb-2.5" />
      <SkeletonBox width={110} height={12} className="mb-2" />
      <SkeletonBox width={130} height={22} className="mb-2.5" />
      <SkeletonBox width={180} height={12} className="mb-2.5" />
      <SkeletonBox width={70} height={20} borderRadius={50} />
    </DetailsContainer>

    {/* Chart placeholder */}
    <div className="bg-white mb-[26px] rounded-xl p-3 shadow-sm border border-[#f2f2f2]">
      <SubTitle>BP Trends</SubTitle>
      <SkeletonBox
        width={chartWidth}
        height={chartHeight}
        borderRadius={8}
        className="my-2 mx-auto"
      />
      <div className="flex justify-center mt-[15px] gap-[30px]">
        <div className="flex items-center">
          <SkeletonBox width={12} height={12} borderRadius={6} className="mr-2" />
          <SkeletonBox width={50} height={12} />
        </div>
        <div className="flex items-center">
          <SkeletonBox width={12} height={12} borderRadius={6} className="mr-2" />
          <SkeletonBox width={60} height={12} />
        </div>
      </div>
    </div>

    {/* Recent readings placeholder */}
    <div className="mb-10">
      <Card>
        <SubTitle>Recent Readings</SubTitle>
        {Array.from({ length: 4 }).map((_, index) => (
          <ReadingSkeletonItem key={index} isLastItem={index === 3} />
        ))}
      </Card>
    </div>
  </div>
);


const BloodPressure = () => {
//   const router = useRouter();
  const { openModal } = useModal();
  const screenWidth = useWindowWidth();
  const contentWidth = screenWidth * 0.92;
  const chartWidth = Math.max(contentWidth - 24, 1);
  const chartHeight = Math.max(190, Math.min(screenWidth * 0.55, 240));

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

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['bloodPressure'],
    queryFn: () => patientService.getBloodPressure(),
  });

  const bloodPressures: BloodPressureReading[] = data?.data ?? [];
  const latestBloodPressure = bloodPressures[0];

  const chartData = readings.map((r) => ({
    date: r.date.split(' ')[1],
    systolic: r.systolic,
    diastolic: r.diastolic,
  }));

  if (isError) {
    return (
      <PageWrapper>
        <div className="flex-1 flex items-center justify-center bg-white px-5 min-h-screen">
          <p className="text-[#EF4444] text-sm text-center">
            {(error as Error)?.message}
          </p>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
        <div>
          {isLoading ? (
            <BloodPressureSkeleton chartWidth={chartWidth} chartHeight={chartHeight} />
          ) : (
            <div className="self-center w-[92%] mx-auto pt-[10px] pb-[110px]">
              <DetailsContainer>
                <div className="bg-[#FDF2FA] px-[15px] py-[13px] rounded-full mb-2.5 inline-flex w-fit">
                  <Heart size={24} color="#DF0000" fill="#DF0000" />
                </div>
                <CardText>Today&apos;s Readings</CardText>
                <CardAmount>
                  {latestBloodPressure
                    ? `${latestBloodPressure.systolic}/${latestBloodPressure.diastolic} mmHg`
                    : '--/-- mmHg'}
                </CardAmount>
                <CardText>
                  Recorded on:{' '}
                  {formatReadingDate(
                    latestBloodPressure?.recordedAt ?? latestBloodPressure?.createdAt
                  )}
                </CardText>
                <span className="text-[#027A48] bg-[#ECFDF3] rounded-full px-2.5 py-1.5 font-medium mt-[7px] inline-block w-fit">
                  Normal
                </span>
              </DetailsContainer>

              <div className="bg-white mb-[26px] rounded-xl p-3 shadow-sm border border-[#f2f2f2]">
                <SubTitle>BP Trends</SubTitle>
                <div style={{ width: chartWidth, height: chartHeight }} className="my-2 mx-auto">
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
                <div className="flex justify-center mt-[15px] gap-[30px]">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2 bg-[#EF4444]" />
                    <span className="text-sm text-[#666] font-medium">Systolic</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2 bg-[#3B82F6]" />
                    <span className="text-sm text-[#666] font-medium">Diastolic</span>
                  </div>
                </div>
              </div>

              <div className="mb-10">
                <Card>
                  <SubTitle>Recent Readings</SubTitle>
                  {bloodPressures.map((recent, index) => {
                    const isLastItem = index === bloodPressures.length - 1;
                    return (
                      <div
                        key={recent.id}
                        className={`pt-[5px] border-[#F2F2F2] ${
                          isLastItem ? 'border-b-0' : 'border-b'
                        }`}
                      >
                        <div className="flex items-center justify-between py-[18px]">
                          <div className="flex items-center">
                            <span className="border border-[#f2f2f2] p-1.5 rounded-[5px] inline-flex">
                              <Stethoscope size={24} color="#DF0000" />
                            </span>
                            <div className="pl-4">
                              <p className="font-medium text-sm text-[#414651] pt-0.5">
                                {recent.systolic}/{recent.diastolic} mmHg
                              </p>
                              <p className="font-normal text-xs text-[#717680] pt-0.5">
                                {formatReadingDate(recent.recordedAt ?? recent.createdAt)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </Card>
              </div>
            </div>
          )}
        </div>
        <Button
          _fn={() =>
            openModal(<BloodPressureModal />, {
              title: 'Add Blood Pressure Reading',
              description: '',
              onClose: () => {},
            })
          }
        >
          Add New Reading
        </Button>
      </PageWrapper>
  );
};

export default BloodPressure;