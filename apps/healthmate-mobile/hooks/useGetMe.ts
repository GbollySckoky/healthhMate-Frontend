"use client"
import { patientService } from '@/service/patientService';
import { useQuery } from '@tanstack/react-query';

const useGetMe= () => {
    const { data, isLoading, isError, error, refetch, isRefetching } = useQuery({
        queryKey: ["me"],
        queryFn: () => patientService.getMe(),
        staleTime: 5 * 60 * 1000,
    });
    const patient = data?.data 
  return {patient, isLoading, isError, error, refetch, isRefetching}
}

export default useGetMe
