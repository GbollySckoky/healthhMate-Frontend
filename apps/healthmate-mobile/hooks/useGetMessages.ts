import { patientService } from '@/service/patientService'
import { useQuery } from '@tanstack/react-query'

const useGetMessags = (communicationId: string) => {
    const {data, isLoading: msgIsLoading, isError: msgIsError, error: msgError} = useQuery({
        queryKey: ['getMessages',communicationId],
        queryFn: () => patientService.getMessages(communicationId),
        enabled: Boolean(communicationId),
    })

  return {messages: data, msgIsLoading, msgIsError, msgError}
}

export default useGetMessags;