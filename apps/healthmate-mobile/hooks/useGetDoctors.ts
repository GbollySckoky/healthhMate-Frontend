import { patientService } from '@/service/patientService';
import { useQuery } from '@tanstack/react-query';

const useGetDoctors = (id: string) => {
    const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['getDoctorById', id],
    queryFn: () => patientService.getDoctorById(String(id)),
    enabled: !!id,
    });

    const consultation = data?.data;
  return {consultation, isLoading, isError, refetch}
}

export default useGetDoctors