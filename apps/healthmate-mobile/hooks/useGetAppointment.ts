import { patientService } from '@/service/patientService';
import { useQuery } from '@tanstack/react-query';
// import React from 'react'

const useGetAppointment = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["getAppointments", 1, 1, "", undefined],
        queryFn: () => patientService.getAppointments(1, 1),
        staleTime: 5 * 60 * 1000,
      });
    const appointment = data?.data?.[0];

  return {appointment,isLoading, isError, error }
}

export default useGetAppointment
