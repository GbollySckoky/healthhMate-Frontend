import { CreateMessage } from '@/lib/interface/message'
import { patientService } from '@/service/patientService'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify/unstyled'

const useCreateMessage = (communicationId: string) => {
    const createMessage = useMutation({
        mutationKey: ['createMessage'],
        mutationFn: (payload: CreateMessage) => patientService.createMessage(communicationId, payload),
        onSuccess: (response) => {
            console.log(response)
        },
        onError: (error: AxiosError<{message: string}>) => {
            console.log(error)
            toast.error(error?.response?.data?.message ?? "Failed to create message")
        }
    })
  return {createMessage}
}

export default useCreateMessage