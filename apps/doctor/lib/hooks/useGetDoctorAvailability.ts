"use client"
import { Doctor } from '@/lib/constant/service';
import { useQuery } from '@tanstack/react-query';

const useGetDoctorAvailability = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["getDoctorAvailability"],
        queryFn: () => Doctor.getDoctorAvailability(),
    });
    const doctorAvailability = data?.data ?? []
  return {doctorAvailability, isLoading, isError, error}
}

export default useGetDoctorAvailability