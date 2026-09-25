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
            toast.success(response.data.message)
        },
        onError: (error: AxiosError<{message: string}>) => {
            toast.error(error?.response?.data?.message ?? "Failed to create message")
        }
    })
  return {createMessage}
}

export default useCreateMessage