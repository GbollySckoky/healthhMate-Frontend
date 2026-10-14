"use client";

import { useQuery } from '@tanstack/react-query';
import { Hospital_Admin } from '../service/service';
import { GET_ALL_APPOINTMENTS } from '../interface/get_all_appointyment';

const useGetTodayAppointment = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['today-appointments'],
    queryFn: () => Hospital_Admin.getTodayAppointments(),
    refetchOnMount: 'always',
  });

  const todayAppointments: GET_ALL_APPOINTMENTS[] = data?.data ?? [];
  return { todayAppointments, isLoading, isError, error };
};

export default useGetTodayAppointment;
