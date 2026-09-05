import { patientService } from '@/service/patientService'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { toast } from "react-toastify";

const useCreateCall = (communicationId?: string) => {
  const [callSessionId, setCallSessionId] = useState<string | null>(null)
  // const startCall = useMutation({
  //   mutationKey: ['startCall', communicationId],

  //   mutationFn: (callSessionId: string) =>
  //     patientService.startCall(callSessionId),

  //   onSuccess: (response) => {
  //     console.log('Call started:', response)
  //   },

  //   onError: (error: AxiosError<{message: string}>) => {
  //     console.error('Failed to start call:', error)
  //     toast.error(error?.response?.data?.message ?? "Failed to start call")
  //   },
  // })

  const createCall = useMutation({
    mutationKey: ['createCall', communicationId],

    mutationFn: () => {
      if (!communicationId) {
        throw new Error('communicationId is required')
      }

      return patientService.createCall(communicationId)
    },

    onSuccess: (response) => {
      const callSessionId = response.data?.id

      console.log('Created call ID:', callSessionId)
      toast.success(response.data?.message ?? "Call created successfully")
      setCallSessionId(callSessionId)
      if (!callSessionId) {
        console.error('Call session ID was not returned')
        return
      }

      // startCall.mutate(callSessionId)
    },

    onError: (error: AxiosError<{message: string}>) => {
      console.log('Failed to create call:', error.response?.data?.message ?? error)
      toast.error(error?.response?.data?.message ?? "Failed to create call")
    },
  })
  
  return {
    createCall,
    // startCall,
    callSessionId,
  }
}

export default useCreateCall