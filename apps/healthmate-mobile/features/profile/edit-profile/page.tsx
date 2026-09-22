"use client";

import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { EditProfile } from '@/lib/interface/user';
import { patientService } from '@/service/patientService';
import useGetMe from '@/hooks/useGetMe';
import ProfileForm from './ProfileForm';
import { PageWrapper } from '@/components/Reusable';
import { ROUTES } from '@/constants/route';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function EditProfileScreen() {
  const queryClient = useQueryClient();
  const router = useRouter()
  const { patient, isLoading, refetch } = useGetMe();

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: EditProfile) =>
      patientService.editProfile(payload),

    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['me'] });
      toast.success(response.data.message)
      refetch();
      router.replace(ROUTES.profile);
    },

    onError: (err: AxiosError<{message: string}>) => {
      toast.error(err.response?.data.message);
    },
  });

  if (isLoading || !patient) {
    return (
    <div className="flex min-h-screen items-center justify-center">
      <svg
        className="h-8 w-8 animate-spin text-pink-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
    </div>
    );
  }

  const initialValues: EditProfile = {
    firstName: patient?.firstName,
    lastName: patient?.lastName,
    phoneNumber: '',
    dateOfBirth: patient?.profile?.dateOfBirth,
    gender: patient?.profile?.gender,
    healthCondition: patient?.profile?.healthCondition,
    allergies: patient?.profile?.allergies,
    profilePicture: patient?.profile?.profilePicture,
    bloodGroup: patient?.profile?.bloodGroup
  };

  return (
    <PageWrapper>
      <ProfileForm
        initialValues={initialValues}
        onSubmit={mutate}
        submitting={isPending}
        submitLabel="Save changes"
      />
    </PageWrapper>
  );
}
