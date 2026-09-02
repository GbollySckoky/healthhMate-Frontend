import { patientService } from '@/service/patientService'
import { useQuery } from '@tanstack/react-query'

const useGetCommunicationId = (appointmentId: string) => {
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['getCommunicationId'],
        queryFn: () => patientService.getCommunicationId(appointmentId)
    })

    const message = data ?? {}
  return {message, isLoading, isError, error}
}

export default useGetCommunicationId;