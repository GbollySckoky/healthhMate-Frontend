import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Card, SubTitle } from '@/components/Reusable';
import { ROUTES } from '@/constants/route';
import { topRatedData } from '@/constants/data';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


const profileFallback = '/assets/images/ellipse-165.png';

const TopRated = () => {
  const router = useRouter();

  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mt-4 mb-1.5">
        <SubTitle>Top Rated Doctors</SubTitle>
        <Link
          href={ROUTES.topRatedDoctors}
          className="flex items-center gap-1 text-[color:var(--light-red,#ff4d4f)] text-xs font-normal"
        >
          See All
          <ArrowRight size={15} />
        </Link>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {topRatedData.map((rated) => {
          const { id, doctorName, type, address } = rated;
          return (
            <Card key={id} >
              <div className="flex items-start mt-[5px] mb-0.5">
                <div className="w-[50px] shrink-0">
                  <Image
                    src={profileFallback}
                    alt={doctorName}
                    className="w-[50px] h-[50px] rounded-full object-cover bg-[#0553]"
                  />
                </div>
                <div className="flex flex-1 justify-between">
                  <div className="ml-[5px]">
                    <SubTitle>{doctorName}</SubTitle>
                    <p className="text-xs text-[color:var(--purple,#7C3AED)] pt-1">
                      {type}
                    </p>
                    <p className="text-xs text-[#717680] pt-1">{address}</p>
                  </div>
                  <span className="text-xs text-[#717680] whitespace-nowrap">
                    ⭐ 4.2(38)
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t-2 border-[#F8F8F8] mt-[15px] pt-2.5">
                <span className="text-base font-semibold text-[color:var(--green,#16A34A)]">
                  ₦10,000
                </span>
                <button
                  onClick={() =>
                    router.push(`/consult-screen/consultation-details/${id}`)
                  }
                  className="py-2 px-4 bg-[color:var(--light-red,#ff4d4f)] rounded-lg"
                >
                  <span className="text-[#F2F2F2] text-sm font-semibold">
                    View Profile
                  </span>
                </button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TopRated;