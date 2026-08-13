'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart, MapPin, ChevronLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { patientService } from '@/service/patientService';
import About from './About';
import ConsultationDetailsSkeleton from '@/components/ConsultationDetailsSkeleton';

import backgroundImage from '@/assets/adhy-savala-zbpgmGe27p8-unsplash (1).jpg';
import profileImage from '@/assets/Ellipse 165.png';

const ConsultationDetails = () => {
  const router = useRouter();
  const { slug: id } = useParams<{ slug: string }>();
  const [liked, setLiked] = useState(false);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['getDoctorById', id],
    queryFn: () => patientService.getDoctorById(String(id)),
    enabled: !!id,
  });

  const consultation = data?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <header className="flex items-center gap-3 border-b px-6 py-4">
          <button onClick={() => router.back()}>
            <ChevronLeft className="h-6 w-6" />
          </button>

          <h1 className="text-lg font-semibold">Doctor&apos;s Profile</h1>
        </header>

        <div className="mx-auto max-w-3xl px-6 py-8">
          <ConsultationDetailsSkeleton />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="text-center">
          <p className="mb-5 text-sm text-rose-600">
            Failed to load doctor profile.
          </p>

          <button
            onClick={() => refetch()}
            className="rounded-lg bg-pink-600 px-5 py-2.5 text-sm font-medium text-white"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="">
      {/* Header */}
      {/* <header className="flex items-center gap-3 border-b px-6 py-4">
        <button onClick={() => router.back()}>
          <ChevronLeft className="h-6 w-6" />
        </button>

        <h1 className="text-lg font-semibold">Doctor&apos;s Profile</h1>
      </header> */}

      <div className="mx-auto max-w-3xl px-6 py-8 h-[50vh]">
        {/* Banner */}
        <div className="relative h-52 w-full">
          <Image
            src={backgroundImage}
            alt="Doctor Banner"
            fill
            className="rounded-xl object-cover"
          />

          <Image
            src={profileImage}
            alt="Doctor"
            width={80}
            height={80}
            className="absolute bottom-[-30px] left-6 rounded-full border-4 border-white"
          />

          <button
            onClick={() => setLiked(!liked)}
            className="absolute right-4 top-4 rounded-full bg-gray-200 p-2"
          >
            <Heart
              className={`h-5 w-5 ${
                liked
                  ? 'fill-red-500 text-red-500'
                  : 'text-gray-700'
              }`}
            />
          </button>
        </div>

        {/* Doctor Details */}
        <div className="mt-10 flex justify-between gap-4">
          <div className="flex-1">
            <h2 className="text-base font-medium">
              Dr{' '}
              {consultation?.firstName
                ? consultation.firstName.charAt(0).toUpperCase() +
                  consultation.firstName.slice(1)
                : '-'}{' '}
              {consultation?.lastName
                ? consultation.lastName.charAt(0).toUpperCase() +
                  consultation.lastName.slice(1)
                : ''}
            </h2>

            <p className="mt-1 text-sm text-pink-600">
              {consultation?.profile?.specialization ??
                'General Practitioner'}
            </p>

            <div className="mt-1 flex items-center gap-1 text-sm text-gray-500">
              <MapPin size={14} />
              <span>
                {consultation?.hospital?.hospitalName ?? '-'}
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-500">
            ⭐ 4.2 (38)
          </p>
        </div>

        <About consultation={consultation} />
      </div>
    </main>
  );
};

export default ConsultationDetails;
