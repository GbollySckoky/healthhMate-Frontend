"use client"
import React from 'react';
import { Popcorn} from 'lucide-react';
import {
  Button,
  Card,
  CardText,
  DetailsContainer,
  PageWrapper,
  Reading,
  SubTitle,
} from '@/components/Reusable';
import { useModal } from '@/store/Modal';
import BloodSugarModal from './BloodSugarModal';
import { BloodPressureSkeleton } from '@/components/BloodPressureSkeleton';
import useDate from '@/hooks/useDate';
import useBloodSugar from '@/hooks/useBloodSugar';


const BloodPressure = () => {
  const { openModal } = useModal();
  const {formatTime, getReadableDate} = useDate()
  const {latestBloodSugar, bloodSugars, isLoading, isError, error} = useBloodSugar()
 

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
                <div className=" pb-2.5 inline-flex w-fit">
                  <Popcorn size={24} color="#DF0000"  />
                </div>
                <CardText>Today&apos;s Readings</CardText>
                <Reading>
                  {latestBloodSugar?.value ?? '-'} {latestBloodSugar?.unit?.replace('_', '/') ?? ''}
                </Reading>
                <CardText>
                  Recorded on:{' '}
                  {getReadableDate(
                    latestBloodSugar?.measuredAt || 'N/A'
                  )} {' '}
                  {formatTime(latestBloodSugar?.measuredAt || 'N/A')}
                </CardText>
                {latestBloodSugar?.timing && latestBloodSugar?.meal && (
                  <CardText>
                    {latestBloodSugar.timing} - {latestBloodSugar.meal}
                  </CardText>
                )}
              </DetailsContainer>

              <div className="mb-10">
                <Card>
                  <SubTitle>Recent Readings</SubTitle>
                  {bloodSugars.map((recent: any, index: number) => {
                    const isLastItem = index === bloodSugars.length - 1;
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
                              <Popcorn size={24} color="#DF0000" />
                            </span>
                            <div className="pl-4">
                              <p className="font-medium text-sm text-[#414651] pt-0.5">
                                {recent.value} {recent.unit?.replace('_', '/')}
                              </p>
                              <p className="font-normal text-xs text-[#717680] pt-0.5">
                                {getReadableDate(recent.measuredAt || 'N/A')} {formatTime(recent?.measuredAt || 'N/A')}
                              </p>
                              <p className="font-normal text-xs text-[#717680] pt-0.5">
                                {recent.timing} - {recent.meal}
                              </p>
                              {recent.notes && (
                                <p className="font-normal text-xs text-[#717680] pt-0.5">
                                  {recent.notes}
                                </p>
                              )}
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
            openModal(<BloodSugarModal />, {
              title: 'Add Blood Sugar Reading',
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