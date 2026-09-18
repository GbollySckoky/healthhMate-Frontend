import { patientService } from '@/service/patientService';
import { useQuery } from '@tanstack/react-query';


const useBloodSugar = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['bloodSugar'],
        queryFn: () => patientService.getBloodSugar(),
      });
    
      const bloodSugars = data?.data ?? [];
      const latestBloodSugar = bloodSugars[0];
  return {latestBloodSugar, bloodSugars, isLoading, isError, error}
}

export default useBloodSugar