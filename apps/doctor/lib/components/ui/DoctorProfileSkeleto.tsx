'use client'

import React from 'react'

const DoctorProfileSkeleton = () => {
  return (
    <div className="bg-white p-6 border border-borderColor rounded-lg mt-5 animate-pulse">

      {/* Profile Header */}
      <div className="mb-3 border-b pb-6 border-borderColor">

        <div className="flex items-center justify-between">

          {/* Profile Image + Name */}
          <div className="flex items-center">

            {/* Avatar */}
            <div className="w-[50px] h-[50px] rounded-full bg-gray-200" />

            <div className="ml-2 space-y-2">

              {/* Name */}
              <div className="h-5 w-48 bg-gray-200 rounded-md" />

              {/* Status */}
              <div className="h-5 w-16 bg-gray-200 rounded-full" />

            </div>

          </div>

          {/* Edit Button */}
          <div className="h-10 w-28 bg-gray-200 rounded-lg" />

        </div>

        {/* About Me */}
        <div className="mt-5 space-y-3">

          {/* Heading */}
          <div className="h-4 w-24 bg-gray-200 rounded-md" />

          {/* Bio Lines */}
          <div className="h-3 w-full bg-gray-200 rounded-md" />

          <div className="h-3 w-4/5 bg-gray-200 rounded-md" />

        </div>

      </div>

      {/* Tabs */}
      <div className="bg-white mt-4">

        <div className="flex gap-6 mb-5">

          <div className="h-8 w-24 bg-gray-200 rounded-md" />

          <div className="h-8 w-28 bg-gray-200 rounded-md" />

        </div>

        {/* Overview Content */}
        <div className="space-y-5">

          {/* Section */}
          <div className="space-y-3">

            <div className="h-5 w-40 bg-gray-200 rounded-md" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div className="h-12 bg-gray-200 rounded-lg" />

              <div className="h-12 bg-gray-200 rounded-lg" />

              <div className="h-12 bg-gray-200 rounded-lg" />

              <div className="h-12 bg-gray-200 rounded-lg" />

            </div>

          </div>

          {/* Another Section */}
          <div className="space-y-3">

            <div className="h-5 w-32 bg-gray-200 rounded-md" />

            <div className="h-20 w-full bg-gray-200 rounded-lg" />

          </div>

        </div>

      </div>

    </div>
  )
}

export default DoctorProfileSkeleton