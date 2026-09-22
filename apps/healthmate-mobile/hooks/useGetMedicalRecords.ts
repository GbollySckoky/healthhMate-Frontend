import { patientService } from '@/service/patientService';
import { useQuery } from '@tanstack/react-query';
import { MedicalRecords } from '@/lib/interface/medical-records';

interface MedicalRecordsResponse {
  data: MedicalRecords;
}

const useGetMedicalRecords = () => {
  const { data, isLoading, isError, error } = useQuery<MedicalRecordsResponse>({
    queryKey: ["getMedicalRecords"],
    queryFn: () => patientService.getMedicalRecords(),
  });
  const medicalRecords = data?.data;

  return { medicalRecords, isLoading, isError, error };
}

export default useGetMedicalRecords