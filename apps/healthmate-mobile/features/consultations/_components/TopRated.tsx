"use client";
import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { SubTitle } from '@/components/Reusable';
import { doctorProfileRoute, ROUTES } from '@/constants/route';
import { topRatedData } from '@/constants/data';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import profileFallback from '@/assets/Group 19153.png';
import DoctorCardSkeleton from '@/components/DoctorCardSkeleton';

const TopRated = () => {
  const router = useRouter();

  // Dummy loading state — topRatedData is static so there's nothing to
  // actually await yet. This just gives the skeleton somewhere to live;
  // swap `isLoading` for a real query's isLoading once this is wired to
  // an API and the JSX below needs no changes.
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timeout);
  }, []);

  const header = (
    <div className="flex items-center justify-between mt-4 mb-2">
      <SubTitle>Top Rated Doctors</SubTitle>
      <Link
        href={ROUTES.topRatedDoctors}
        className="flex items-center gap-1 text-pink-600 text-xs font-normal hover:underline"
      >
        See All
        <ArrowRight size={15} />
      </Link>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex-1">
        {header}
        <div className="flex gap-4 overflow-x-auto pb-2">
          {[1, 2, 3].map((key) => (
            <DoctorCardSkeleton key={key} />
          ))}
        </div>
      </div>
    );
  }

  if (topRatedData.length === 0) {
    return (
      <div className="flex-1">
        {header}
        <div className="flex items-center justify-center min-h-[100px]">
          <p className="text-[#414651] font-medium text-sm">No doctors available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      {header}

      <div className="flex gap-4 overflow-x-auto pb-2 ">
        {topRatedData.map((rated) => {
          const { id, doctorName, type, address } = rated;
          return (
            <div key={id} className="w-[350px] shrink-0 p-[15px] border border-[#F2F2F2] rounded-[10px] bg-white">
              <div className="flex items-start mt-[5px] mb-0.5">
                <div className="w-[50px] shrink-0">
                  <Image
                    src={profileFallback}
                    alt={doctorName}
                    width={50}
                    height={50}
                    className="w-[50px] h-[50px] rounded-full object-cover bg-[#F2F2F2]"
                  />
                </div>
                <div className="flex flex-1 justify-between">
                  <div className="ml-2.5">
                    <SubTitle>{doctorName}</SubTitle>
                    <p className="text-xs text-[color:var(--purple,#7C3AED)] pt-1">
                      {type}
                    </p>
                    <p className="text-xs text-[#717680] pt-1">{address}</p>
                  </div>
                  <span className="text-xs text-[#717680] whitespace-nowrap ml-2">
                    ⭐ 4.2(38)
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t-2 border-[#F8F8F8] mt-[15px] pt-2.5">
                <span className="text-base font-semibold text-[color:var(--green,#16A34A)]">
                  ₦10,000
                </span>
                <button
                  type="button"
                  onClick={() =>
                    router.push(doctorProfileRoute(id))
                  }
                  className="py-2 px-4 bg-pink-600 rounded-lg transition-opacity hover:opacity-90"
                >
                  <span className="text-[#F2F2F2] text-sm font-semibold">
                    View Profile
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopRated;
