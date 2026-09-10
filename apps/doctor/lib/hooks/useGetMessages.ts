// import { patientService } from '@/service/patientService'
import { useQuery } from '@tanstack/react-query'
import { Doctor } from '../constant/service';

const useGetMessages = (communicationId: string) => {
    const {data, isLoading: msgIsLoading, isError: msgIsError, error: msgError} = useQuery({
        queryKey: ['getMessages',communicationId],
        queryFn: () => Doctor.getMessages(communicationId),
        enabled: Boolean(communicationId),
    })

  return {messages: data, msgIsLoading, msgIsError, msgError}
}

export default useGetMessages;