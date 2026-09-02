import { patientService } from '@/service/patientService'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify/unstyled'

const useCreateCall = (communicationId?: string) => {
  const startCall = useMutation({
    mutationKey: ['startCall'],

    mutationFn: (callSessionId: string) =>
      patientService.startCall(callSessionId),

    onSuccess: (response) => {
      console.log('Call started:', response)
    },

    onError: (error: AxiosError<{message: string}>) => {
      console.error('Failed to start call:', error)
      toast.error(error?.response?.data?.message ?? "Failed to start call")
    },
  })

  const createCall = useMutation({
    mutationKey: ['createCall'],

    mutationFn: () => {
      if (!communicationId) {
        throw new Error('communicationId is required')
      }

      return patientService.createCall(communicationId)
    },

    onSuccess: (response) => {
      const callSessionId = response.data?.id

      console.log('Created call ID:', callSessionId)

      if (!callSessionId) {
        console.error('Call session ID was not returned')
        return
      }

      startCall.mutate(callSessionId)
    },

    onError: (error: AxiosError<{message: string}>) => {
      console.error('Failed to create call:', error)
      toast.error(error?.response?.data?.message ?? "Failed to create call")
    },
  })

  return {
    createCall,
    startCall,
  }
}

export default useCreateCall