"use client"
import React from 'react';
import Reminder from '@/features/home/_components/Reminder';
import Streak from '@/features/home/_components/Streak';
import Activities from '@/features/home/_components/Activities';
import useGetMe from '@/hooks/useGetMe';
import { PageWrapper, Title } from '@/components/Reusable';
import AppointmentCard from './_components/AppointmentCard';


const HomePage = () => {
  // Dynamic greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const { patient } = useGetMe();

  return (
    <PageWrapper>
      <section className="flex flex-row justify-between items-start">
        <div>
          <Title>{getGreeting()}, {patient?.firstName || ''} 👋</Title>
          <p className="font-libre font-normal text-xs text-[#717680] mt-0.5">
            Let&apos;s take a step toward a healthier you today.
          </p>
        </div>
        {/* <div className="flex flex-row items-center gap-0.5">
          <button
            type="button"
            className="p-2 rounded-lg hover:bg-gray-100"
            onClick={() => router.push('/notifications')}
            aria-label="View notifications"
          >
            <Bell size={20} color="#717680" />
          </button>
        </div> */}
      </section>

      <div>
        <Activities />
        <AppointmentCard />
        <Streak />
       
        <Reminder />
      </div>
    </PageWrapper>
  );
};

export default HomePage;
