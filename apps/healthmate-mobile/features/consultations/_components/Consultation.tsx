import React from 'react';
import { Heart, ArrowRight } from 'lucide-react';
import { SubTitle } from '@/components/Reusable';
import {
  GetHospital,
  GetHospitalsResponse,
} from '@/lib/interface/get-hospitals-interface';
import Image, { StaticImageData } from 'next/image';
import useToggle from '@/hooks/useToggle';
import Link from 'next/link';
import { ROUTES } from '@/constants/route';
import HospitalCardSkeleton from '@/components/HospitalCardSkeleton';
import defaultHospitalImage from '@/assets/Group 19153.png'
import profileFallback from '@/assets/adhy-savala-zbpgmGe27p8-unsplash (1).jpg';


type ConsultationProps = {
  data: GetHospitalsResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  searchQuery?: string;
};

// const defaultHospitalImage = consultationData[0]?.image;

const getHospitalImageSource = (profile?: string | StaticImageData | null) => {
  return profile || defaultHospitalImage;
};

const Consultation = ({
  data,
  isLoading,
  isError,
  error,
  searchQuery,
}: ConsultationProps) => {
  const { isToggle, handleToggle } = useToggle();
  const hospitals = data?.data ?? [];

  if (isLoading) {
    return (
      <div className="flex-1 mt-2.5">
        <div className="flex items-center justify-between mb-1.5">
          <SubTitle>Featured Hospitals</SubTitle>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {[1, 2, 3].map((key) => (
            <HospitalCardSkeleton key={key} />
          ))}
        </div>
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
    <div className="flex-1 mt-2.5">
      <div className="flex items-center justify-between mb-1.5">
        <SubTitle>Featured Hospitals</SubTitle>
        <Link
          href={ROUTES.allAppointments}
          className="flex items-center gap-1 text-pink-600 text-xs font-normal"
        >
          View All
          <ArrowRight size={15} />
        </Link>
      </div>

      {hospitals.length === 0 ? (
        <div className="flex items-center justify-center min-h-[120px]">
          <p className="text-[#414651] font-medium text-sm">
            {searchQuery ? 'No hospitals found' : 'No hospitals available'}
          </p>
        </div>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {hospitals.map((hospital: GetHospital, index: number) => {
            const { id, hospitalName, email, phoneNumber, profile } = hospital;
            const toggleId = String(id);

            return (
              <div
                key={id}
                className="w-[300px] shrink-0 bg-[#FAFAFA] rounded-xl p-2.5 border border-[#F2F2F2]"
              >
                <div className="relative w-full h-[180px]">
                  <Image
                    src={getHospitalImageSource(profile) || profileFallback}
                    alt={`${hospitalName || 'Hospital'} cover`}
                    width={300}
                    height={180}
                    sizes="(max-width: 768px) 100vw, 300px"
                    priority={index === 0}
                    className="w-full h-full object-cover rounded-[10px]"
                  />
                  <button
                    onClick={() => handleToggle(toggleId)}
                    className="absolute right-2.5 top-2.5 bg-[#E5EBED] p-[5px] rounded-full"
                  >
                    <Heart
                      size={24}
                      color={isToggle === toggleId ? '#FF6760' : 'black'}
                      fill={isToggle === toggleId ? '#FF6760' : 'none'}
                    />
                  </button>
                </div>

                <div className="p-1.5 mt-2.5">
                  <div className="flex justify-between">
                    <div className="mb-2">
                      <p className="text-sm font-medium text-[#1E1E1E] mb-1">
                        {hospitalName || '-'}
                      </p>
                      <p className="text-xs text-[#717680] pt-[3px]">
                        {email || 'Email unavailable'}
                      </p>
                      <p className="text-xs text-[#414651] leading-5 mb-3 pt-[3px]">
                        {phoneNumber || 'Phone unavailable'}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <Link
                      href={`/consultations/${id}`}
                      // state={{ hospitalName: hospitalName || 'Hospital' }}
                      className="border border-[#f2f2f2] py-3 rounded-[10px] w-full text-center block"
                    >
                      <span className="text-[#414651] hover:underline hover:text-pink-600 text-xs font-medium">
                        View Doctors
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Consultation;