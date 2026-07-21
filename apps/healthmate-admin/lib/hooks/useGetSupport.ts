import { useQuery } from '@tanstack/react-query';
import { Hospital_Admin } from '../service/service';
// import { Doctor } from '@/lib/constant/service';

const useGetSupport = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["getSupportTicket"],
        queryFn: () => Hospital_Admin.getSupportTicket(),
    });
    const supportData = data?.data ?? []
  return {supportData, isLoading, isError, error}
}

export default useGetSupport