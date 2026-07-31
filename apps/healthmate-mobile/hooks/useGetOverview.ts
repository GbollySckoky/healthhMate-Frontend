import { useQuery } from '@tanstack/react-query';
import { patientService } from '@/service/patientService';
import { GetOverview } from '@/lib/interface/get-overview-interface';

const useGetOverview = () => {
    const { data, isError, isLoading, error, refetch } = useQuery<
    GetOverview,
    Error
  >({
    queryKey: ['getOverview'],
    queryFn: patientService.getOverview,
    staleTime: 5 * 60 * 1000,
  });
    const overview = data?.data ?? null
  return {
      overview,
      isLoading,
      isError,
      error,
      refetch,
    }
}

export default useGetOverview