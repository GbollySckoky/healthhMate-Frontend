import { useQuery } from '@tanstack/react-query';
import { patientService } from '@/service/patientService';

const useGetSupport = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["getSupportTicket"],
        queryFn: () => patientService.getSupportTicket(),
    });
    const supportData = data?.data ?? []
  return {supportData, isLoading, isError, error}
}

export default useGetSupport