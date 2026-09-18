import { Hospital_Admin } from '../service/service';
import { useQuery } from '@tanstack/react-query';

const useGetStats = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['stats'],
        queryFn: () => Hospital_Admin.getStats(),
    })

    
    const stats = data?.data;
  return {stats, isLoading, isError, error}
}

export default useGetStats