'use client';
import React, { useEffect, useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
import { Filter, Heart, Loader2 } from 'lucide-react';
// import { NavHeader } from '@/components/Header/Header';
// import { ScreenLayout } from '@/components/ScreenLayout/ScreenLayout';
// import { ScreenOverFlowLayout } from '@/components/scrollView/ScreenOverFlowLayout';
// import { Wrapper } from '@/components/typography/Typography';
// import SearchInput from '@/components/Input/SearchInput';
// import { consultationData } from '@/lib/data';
// import useToggle from '@/lib/hooks/useToggle';
// import SafeArea from '@/components/safeAreaView/SafeAreaView';
import { useQuery } from '@tanstack/react-query';
import { patientService } from '@/service/patientService';
import { GetHospital } from '@/lib/interface/get-hospitals-interface';
import Image from 'next/image';
import { Wrapper } from '@/components/Reusable';
import SearchInput from '@/components/SearchInput';
import Link from 'next/link';
// import { useRouter } from 'next/navigation';
import useToggle from '@/hooks/useToggle';
import defaultHospitalImage from '@/assets/Group 19153.png'

// const defaultHospitalImage = consultationData[0]?.image;

const getHospitalImageSource = (profile?: string | null) => {
  return profile || defaultHospitalImage;
};

const AllHospitalsPage = () => {
  // const router = useRouter();
  const [searchInput, setSearchInput] = useState('');
  const [searchDebounceQuery, setSearchDebounceQuery] = useState('');
  const { isToggle, handleToggle } = useToggle();
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchDebounceQuery(searchInput);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['getAllHospitals', page, limit, searchDebounceQuery],
    queryFn: () =>
      patientService.getHospitals(page, limit, searchDebounceQuery),
  });

  const hospitals = data?.data ?? [];
  const meta = data?.meta;
  const canGoPrevious = meta ? meta.page > 1 : page > 1;
  const canGoNext = meta ? meta.page < meta.totalPages : false;

  return (
    <Wrapper>
      <div className="flex items-center justify-between mb-5">
        <SearchInput
          placeholder="Search for a hospital"
          value={searchInput}
          onChange={(value: string) => setSearchInput(value)}
        />
        <button className="border border-[#D6D7DA] rounded-[5px] ml-2.5 p-[9px] shrink-0">
          <Filter size={20} color="black" />
        </button>
      </div>

      <div>
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-10">
            <Loader2 className="animate-spin" size={36} color="#DD2590" />
            <p className="text-[#414651] font-medium text-sm mt-2 text-center">
              Loading hospitals...
            </p>
          </div>
        )}

        {isError && (
          <div className="flex flex-col items-center justify-center py-10">
            <p className="text-[#B42318] font-medium text-sm text-center">
              {(error as Error)?.message || 'Unable to load hospitals'}
            </p>
          </div>
        )}

        {!isLoading && !isError && hospitals.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10">
            <p className="text-[#414651] font-medium text-sm text-center">
              No hospitals found
            </p>
          </div>
        )}

        {!isLoading &&
          !isError &&
          hospitals.map((hospital: GetHospital) => {
            const {
              id,
              hospitalName,
              email,
              phoneNumber,
              profile,
              dateOfEstablishment,
            } = hospital;
            const toggleId = String(id);

            return (
              <div
                key={id}
                className="bg-[#FAFAFA] rounded-xl p-2.5 border border-[#f2f2f2] mb-5"
              >
                <div className="relative w-full h-[180px]">
                  <Image
                    src={getHospitalImageSource(profile)}
                    alt="Hospital"
                    className="w-full h-full object-cover rounded-[10px]"
                  />
                  <button
                    onClick={() => handleToggle(toggleId)}
                    className="absolute right-2.5 top-2.5 bg-[#E5EBED] p-[5px] rounded-full"
                  >
                    <Heart
                      size={24}
                      color={isToggle === toggleId ? '#DF0000' : 'black'}
                      fill={isToggle === toggleId ? '#DF0000' : 'none'}
                    />
                  </button>
                </div>

                <div className="p-1.5 mt-2.5">
                  <div className="flex justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium text-[#1E1E1E] mb-1">
                        {hospitalName || '-'}
                      </p>
                      <p className="text-xs text-[#717680] pt-[3px]">
                        {email || 'Email unavailable'}
                      </p>
                      <p className="text-xs text-[#717680] pt-[3px]">
                        {phoneNumber || 'Phone unavailable'}
                      </p>
                      <p className="text-xs text-[color:var(--light-red,#ff4d4f)] leading-5 mb-3 pt-[3px]">
                        Established {dateOfEstablishment || '-'}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <Link
                      href={`/consult-screen/${id}`}
                      // state={{ hospitalName: hospitalName || 'Hospital' }}
                      className="border border-[#f2f2f2] py-3 rounded-[10px] w-full text-center block"
                    >
                      <span className="text-black text-xs font-semibold">
                        View Doctors
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}

        {!isLoading && !isError && meta && (
          <div className="flex items-center justify-between mt-2">
            <button
              disabled={!canGoPrevious}
              onClick={() =>
                setPage((currentPage) => Math.max(currentPage - 1, 1))
              }
              className={`rounded-lg px-4 py-[10px] ${
                canGoPrevious ? 'bg-[#DD2591]' : 'bg-[#D6D7DA]'
              }`}
            >
              <span className="text-white font-medium text-[13px]">
                Previous
              </span>
            </button>

            <p className="text-[#717680] font-medium text-[13px] text-center whitespace-pre-line">
              {`Page ${meta.page} of ${Math.max(meta.totalPages, 1)}\n${meta.total} hospitals`}
            </p>

            <button
              disabled={!canGoNext}
              onClick={() => setPage((currentPage) => currentPage + 1)}
              className={`rounded-lg px-4 py-[10px] ${
                canGoNext ? 'bg-[#DD2591]' : 'bg-[#D6D7DA]'
              }`}
            >
              <span className="text-white font-medium text-[13px]">
                Next
              </span>
            </button>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default AllHospitalsPage;