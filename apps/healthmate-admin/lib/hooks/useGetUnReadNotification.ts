"use client"
import { Hospital_Admin } from '@/lib/service/service';;
import { useQuery } from '@tanstack/react-query';

const useGetUnReadNotification = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["un-read-notification"],
        queryFn: () => Hospital_Admin.unReadNotifications(),
    });
    const unReadNotifications = data ?? null
  return {unReadNotifications, isLoading, isError, error}
}

export default useGetUnReadNotification