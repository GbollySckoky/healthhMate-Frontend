"use client"
import { Doctor } from '@/lib/constant/service';
import { useQuery } from '@tanstack/react-query';

const useGetUnReadNotification = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["un-read-notification"],
        queryFn: () => Doctor.unReadNotifications(),
    });
    const unReadNotifications = data ?? null
  return {unReadNotifications, isLoading, isError, error}
}

export default useGetUnReadNotification