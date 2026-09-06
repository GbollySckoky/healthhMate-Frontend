"use client"
import React from 'react';
import {  Pill } from 'lucide-react';
import {
  Card,
  CardText,
  DetailsContainer,
  SubTitle,
  Wrapper,
  Button,
  PageWrapper,
  Reading
} from '@/components/Reusable';
import MedicationModal from './MedicationModal';
import { useQuery } from '@tanstack/react-query';
import { patientService } from '@/service/patientService';
import { useModal } from '@/store/Modal';
import MedicationSkeleton from '@/components/MedicationSkeleton';
import useDate from '@/hooks/useDate';
import { MedicationReading } from '@/lib/interface/create-medication-interface';


const Medication = () => {
  const { openModal } = useModal();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['getmedication'],
    queryFn: () => patientService.getMedication(),
  });
  const {getReadableDate, formatTime} = useDate()

  const medicationReadings: MedicationReading[] = data?.data ?? [];
  const latestMedication = medicationReadings[0];
  // const latestMedicationStatus = latestMedication?.status ?? 'Logged';

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
          {isLoading ? (
            <MedicationSkeleton />
          ) : (
            <Wrapper>
              <DetailsContainer>
                <div className="bg-[#FDF2FA] px-[15px] py-[13px] rounded-full mb-2.5 inline-flex w-fit">
                  <Pill size={24} color="#C11574" />
                </div>
                <CardText>Today Dose</CardText>
                <Reading>{latestMedication?.name ?? '--'}</Reading>
                <CardText>
                  Recorded on:{' '}
                  {getReadableDate(latestMedication?.recordedAt || 'N/A')} {" "} at {" "}
                  {formatTime(latestMedication?.createdAt || 'N/A')}
                </CardText>
                {/* <span className="text-[#027A48] bg-[#ECFDF3] rounded-full px-2.5 py-1.5 font-medium mt-[7px] inline-block w-fit">
                  {latestMedicationStatus}
                </span> */}
              </DetailsContainer>

              <div className="mb-10">
                <Card>
                  <SubTitle>Medication History</SubTitle>
                  {medicationReadings.map((recent, index) => {
                    // const status = recent.status ?? 'Logged';
                    const isLastItem = index === medicationReadings.length - 1;
                    // const colors = statusStyles[status] ?? statusStyles.Logged;

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
                              <Pill size={24} color="#C11574" />
                            </span>
                            <div className="pl-4">
                              <p className="font-medium text-sm text-[#414651] pt-0.5">
                                {recent.name ?? 'Medication'}
                              </p>
                              <p className="font-normal text-xs text-[#717680] pt-0.5">
                                {getReadableDate(recent.recordedAt || 'N/A')} {" "} at {" "}
                                {formatTime(recent.createdAt || 'N/A')}
                              </p>
                            </div>
                          </div>

                          {/* <span
                            className="px-[15px] py-[7px] rounded-full font-medium"
                            style={{ backgroundColor: colors.bg, color: colors.text }}
                          >
                            {status}
                          </span> */}

                          <span className="text-sm font-normal text-[#414651] items-start">
                            {recent.dosage ?? '--'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </Card>
              </div>
            </Wrapper>
          )}
        </div>
        <Button
          _fn={() =>
            openModal(<MedicationModal />, {
              title: 'Log Medication',
              description: '',
              onClose: () => {},
            })
          }
        >
          Log New Medication
        </Button>
    </PageWrapper>
  );
};

export default Medication;