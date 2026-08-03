"use client"
import React from 'react';
import { Plus } from 'lucide-react';
import { PageWrapper } from '@/components/Reusable';
import HealthOverview from './_components/HealthOverview';

const TrackPage = () => {
  return (
    <div className="relative">
      <PageWrapper>
        {/* Cards */}
        <HealthOverview />
      </PageWrapper>

      <button
        className="absolute bottom-5 right-5 flex items-center justify-center rounded-[40px] bg-red-900 p-[15px]"
      >
        <Plus size={24} color="white" />
      </button>
    </div>
  );
};

export default TrackPage;