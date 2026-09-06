"use client"
import React from 'react';
import {  Heart, Stethoscope } from 'lucide-react';
import {
  Button,
  Card,
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
import useDate from '@/hooks/useDate';


const BloodPressure = () => {
  const { openModal } = useModal();
  const {formatTime, getReadableDate} = useDate()

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['bloodPressure'],
    queryFn: () => patientService.getBloodPressure(),
  });

  const bloodPressures: BloodPressureReading[] = data?.data ?? [];
  const latestBloodPressure = bloodPressures[0];

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
                  {getReadableDate(
                    latestBloodPressure?.recordedAt || 'N/A'
                  )} {' '}
                  {formatTime(latestBloodPressure?.createdAt || 'N/A')}
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
                                {getReadableDate(recent.recordedAt || 'N/A')} {formatTime(recent?.recordedAt || 'N/A')}
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