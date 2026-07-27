import { useQuery } from '@tanstack/react-query';
import { Hospital_Admin } from '../service/service';

const useGetDoctorAvailability = (id: string) => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["getDoctorAvailability", id],
        queryFn: () => Hospital_Admin.getDoctorAvailability(id),
        enabled: !!id,
    });
    const availability = data?.data ?? []
  return {availability, isLoading, isError, error}
}

export default useGetDoctorAvailability