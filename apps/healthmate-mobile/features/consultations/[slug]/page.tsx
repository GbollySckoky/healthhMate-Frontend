'use client';
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Filter } from 'lucide-react';

import { Wrapper, SubTitle } from '@/components/Reusable';
import { useQuery } from '@tanstack/react-query';
import { patientService } from '@/service/patientService';
import { GetDoctor } from '@/lib/interface/get-doctors-interface';
import Image from 'next/image';
import SearchInput from '@/components/SearchInput';
import DoctorCardSkeleton from '@/components/DoctorCardSkeleton';

import profileFallback from '@/assets/Ellipse 165.png';
import { CapitalizeName } from '@/constants/capitalizeName';
import { doctorProfileRoute } from '@/constants/route';

const getDoctorName = (doctor: GetDoctor) => {
  if (doctor.fullName) return doctor.fullName;

  const name = [
    CapitalizeName(doctor.firstName ?? undefined),
    CapitalizeName(doctor.lastName ?? undefined),
  ]
    .filter(Boolean)
    .join(' ');
  return `Dr. ${name}` || 'Doctor unavailable';
};

const getDoctorImageSource = (doctor: GetDoctor) => {
  const image =
    doctor.profileImage || doctor.image || doctor.profile?.profileImage;

  return image || profileFallback;
};

const getConsultationFee = (doctor: GetDoctor) => {
  const fee = doctor.profile?.consultationFee?.toLocaleString();
  return fee ? `₦ ${fee}` : '₦ 0';
};

const ConsultationId = () => {
  const router = useRouter();
  const params  = useParams();
  const id = params?.slug;

  const [searchInput, setSearchInput] = useState('');
  const hospitalId = String(id);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['getAllDoctors', hospitalId],
    queryFn: () => patientService.getDoctors(hospitalId),
    enabled: !!id,
  });

  const doctors = data?.data ?? [];
  const searchQuery = searchInput.trim();

  if (isLoading) {
    return (
      <Wrapper>
        <div className="flex items-center justify-between mb-5">
          <SearchInput
            placeholder="Search for a doctor or specialty"
            value={searchInput}
            onChange={(value: string) => setSearchInput(value)}
          />
          <button className="border border-[#D6D7DA] rounded-[5px] ml-2.5 p-[9px] shrink-0">
            <Filter size={20} color="black" />
          </button>
        </div>
        <div className="mb-[50px]">
          {[1, 2, 3, 4].map((key) => (
            <DoctorCardSkeleton key={key} />
          ))}
        </div>
      </Wrapper>
    );
  }

  if (isError) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-5 min-h-[60vh]">
        <p className="text-[#B42318] font-medium text-sm mb-4 text-center">
          {(error as Error)?.message || 'Unable to load doctors'}
        </p>
        <button
          onClick={() => refetch()}
          className="bg-[#DD2591] rounded-lg px-[18px] py-2.5"
        >
          <span className="text-white font-medium text-[13px]">
            Try Again
          </span>
        </button>
      </div>
    );
  }

  return (
    <Wrapper>
      <div className="flex items-center justify-between mb-5">
        <SearchInput
          placeholder="Search for a doctor or specialty"
          value={searchInput}
          onChange={(value: string) => setSearchInput(value)}
        />
        <button className="border border-[#D6D7DA] rounded-[5px] ml-2.5 p-[9px] shrink-0">
          <Filter size={20} color="black" />
        </button>
      </div>

      <div className="mb-[50px]">
        {doctors.length === 0 && (
          <div className="flex items-center justify-center min-h-[160px]">
            <p className="text-[#414651] font-normal text-sm text-center">
              {searchQuery ? 'No doctors found' : 'No doctors available'}
            </p>
          </div>
        )}

        {doctors.map((doctor) => {
          const specialization =
            doctor.profile?.specialization || 'General Practitioner';

          return (
            <div
              key={doctor.id}
              className="p-[15px] border border-[#F2F2F2] rounded-[10px] bg-white mb-5"
            >
              <div className="flex items-start mt-[5px] mb-0.5">
                <div className="w-[50px] shrink-0">
                  <Image
                    src={getDoctorImageSource(doctor)}
                    alt={getDoctorName(doctor)}
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />
                </div>
                <div className="flex flex-1 justify-between">
                  <div className="ml-2.5 flex-1">
                    <SubTitle>{getDoctorName(doctor)}</SubTitle>
                    <p className="text-xs text-[#717680] pt-1">
                      {specialization}
                    </p>
                    <p className="text-xs text-[#717680] pt-1">
                      {doctor.hospital?.hospitalName || 'Hospital unavailable'}
                    </p>
                  </div>
                  <span className="text-xs text-[#717680] whitespace-nowrap">
                    ⭐ 4.2(38)
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t-2 border-[#F8F8F8] mt-[15px] pt-[15px]">
                <span className="text-base font-semibold text-[color:var(--green,#16A34A)]">
                  {getConsultationFee(doctor)}
                </span>
                <button
                  onClick={() =>
                    router.push(
                      doctorProfileRoute(doctor.id)
                    )
                  }
                  className="py-1 px-4 bg-pink-600 rounded-md"
                >
                  <span className="text-[#F2F2F2] text-sm font-medium">
                    View Profile
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};

export default ConsultationId;
