"use client"
import React from 'react';
// import { useRouter } from 'next/navigation';
import {  Heart, Stethoscope } from 'lucide-react';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts';
import {
    Button,
  Card,
  // CardAmount,
  CardText,
  DetailsContainer,
  PageWrapper,
  Reading,
  SubTitle,
} from '@/components/Reusable';
import { useQuery } from '@tanstack/react-query';
import { patientService } from '@/service/patientService';
import { useModal } from '@/store/Modal';
import BloodPressureModal from './BloodPressureModal';
import { BloodPressureReading } from '@/lib/interface/create-blood-pressure';
import { BloodPressureSkeleton } from '@/components/BloodPressureSkeleton';

const formatReadingDate = (date?: string) => {
  if (!date) return 'No date recorded';

  const readingDate = new Date(date);
  if (Number.isNaN(readingDate.getTime())) return 'No date recorded';

  return `${readingDate.toLocaleDateString()} at ${readingDate.toLocaleTimeString()}`;
};


// const useWindowWidth = () => {
//   const [width, setWidth] = useState(
//     typeof window !== 'undefined' ? window.innerWidth : 375
//   );

//   useEffect(() => {
//     const handleResize = () => setWidth(window.innerWidth);
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return width;
// };


const BloodPressure = () => {
  const { openModal } = useModal();
  // const screenWidth = useWindowWidth();
  // const contentWidth = screenWidth * 0.92;
  // const chartWidth = Math.max(contentWidth - 24, 1);
  // const chartHeight = Math.max(190, Math.min(screenWidth * 0.55, 240));

  // const [readings] = useState([
  //   { date: 'Jun 20', systolic: 82, diastolic: 62 },
  //   { date: 'Jun 21', systolic: 95, diastolic: 75 },
  //   { date: 'Jun 22', systolic: 118, diastolic: 105 },
  //   { date: 'Jun 23', systolic: 118, diastolic: 95 },
  //   { date: 'Jun 24', systolic: 140, diastolic: 82 },
  //   { date: 'Jun 25', systolic: 140, diastolic: 82 },
  //   { date: 'Jun 26', systolic: 140, diastolic: 82 },
  //   { date: 'Jun 27', systolic: 140, diastolic: 82 },
  // ]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['bloodPressure'],
    queryFn: () => patientService.getBloodPressure(),
  });

  const bloodPressures: BloodPressureReading[] = data?.data ?? [];
  const latestBloodPressure = bloodPressures[0];

  // const chartData = readings.map((r) => ({
  //   date: r.date.split(' ')[1],
  //   systolic: r.systolic,
  //   diastolic: r.diastolic,
  // }));

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
            <BloodPressureSkeleton  />
          ) : (
            <div className="self-center w-[92%] mx-auto pt-[10px] pb-[110px]">
              <DetailsContainer>
                <div className="bg-[#FDF2FA] px-[15px] py-[13px] rounded-full mb-2.5 inline-flex w-fit">
                  <Heart size={24} color="#DF0000" fill="#DF0000" />
                </div>
                <CardText>Today&apos;s Readings</CardText>
                <Reading>
                  {latestBloodPressure
                    ? `${latestBloodPressure.systolic}/${latestBloodPressure.diastolic} mmHg`
                    : '--/-- mmHg'}
                </Reading>
                <CardText>
                  Recorded on:{' '}
                  {formatReadingDate(
                    latestBloodPressure?.recordedAt ?? latestBloodPressure?.createdAt
                  )}
                </CardText>
                <span className="text-[#027A48] bg-[#ECFDF3] rounded-full px-2.5 py-1.5 font-normal mt-[7px] inline-block w-fit text-xs">
                  Normal
                </span>
              </DetailsContainer>

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