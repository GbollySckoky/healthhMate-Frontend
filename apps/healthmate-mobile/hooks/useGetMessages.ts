import { patientService } from '@/service/patientService'
import { useQuery } from '@tanstack/react-query'

const useGetMessags = (communicationId: string) => {
    const {data, isLoading: msgIsLoading, isError: msgIsError, error: msgError} = useQuery({
        queryKey: ['getMessages'],
        queryFn: () => patientService.getMessages(communicationId)
    })

    const messages = data ?? []
  return {messages, msgIsLoading, msgIsError, msgError}
}

export default useGetMessags;