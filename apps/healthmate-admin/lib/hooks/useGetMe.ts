import { useQuery } from '@tanstack/react-query';
import { Hospital_Admin } from '../service/service';

const useGetMe = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["me"],
        queryFn: () => Hospital_Admin.getMe(),
    });
    const myData = data?.data ?? null
  return {myData, isLoading, isError, error}
}

export default useGetMe