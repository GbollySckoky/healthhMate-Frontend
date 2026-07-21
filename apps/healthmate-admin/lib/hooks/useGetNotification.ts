"use client"
// import { Doctor } from '@/lib/constant/service';
import { useQuery } from '@tanstack/react-query';
import { Hospital_Admin } from '../service/service';

const useGetNotification = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["notification"],
        queryFn: () => Hospital_Admin.getNotification(),
    });
    const notifications = data?.data ?? []
  return {notifications, isLoading, isError, error}
}

export default useGetNotification