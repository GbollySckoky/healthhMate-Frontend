// import { patientService } from '@/service/patientService'
import { useQuery } from '@tanstack/react-query'
import { Doctor } from '../constant/service'

const useGetAppointmentCommunicationId = (appointmentId: string) => {
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['getCommunicationId'],
        queryFn: () => Doctor.getCommunicationId(appointmentId),
        enabled: !!appointmentId
    })

    const message = data || {}
  return {message, isLoading, isError, error}
}

export default useGetAppointmentCommunicationId;