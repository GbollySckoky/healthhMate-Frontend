import { useQuery } from '@tanstack/react-query';
import { Doctor } from '@/lib/constant/service';

const useGetSupport = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["getSupportTicket"],
        queryFn: () => Doctor.getSupportTicket(),
    });
    const supportData = data?.data ?? []
  return {supportData, isLoading, isError, error}
}

export default useGetSupport