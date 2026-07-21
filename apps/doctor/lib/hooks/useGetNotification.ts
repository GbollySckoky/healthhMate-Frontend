"use client"
import { Doctor } from '@/lib/constant/service';
import { useQuery } from '@tanstack/react-query';

const useGetNotification = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["notification"],
        queryFn: () => Doctor.getNotification(),
    });
    const notifications = data?.data ?? []
  return {notifications, isLoading, isError, error}
}

export default useGetNotification