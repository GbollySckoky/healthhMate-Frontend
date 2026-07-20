"use client"
import { Doctor } from '@/lib/constant/service';
import { useQuery } from '@tanstack/react-query';

const useGetMe = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["me"],
        queryFn: () => Doctor.getMe(),
    });
    const myData = data?.data ?? null
  return {myData, isLoading, isError, error}
}

export default useGetMe