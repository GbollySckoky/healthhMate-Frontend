import { patientService } from '@/service/patientService'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { toast } from "react-toastify";

interface StartCallVariables {
  communicationId: string
  callSessionId: string
}

const useCreateCall = (communicationId?: string) => {
  const [callSessionId, setCallSessionId] = useState<string | null>(null)
  const startCall = useMutation({
    mutationKey: ['startCall'],

    mutationFn: ({ communicationId, callSessionId }: StartCallVariables) =>
      patientService.startCall(communicationId, callSessionId),

    onSuccess: (response) => {
      toast.success(response.data.message)
    },

    onError: (error: AxiosError<{message: string}>) => {
      toast.error(error?.response?.data?.message ?? "Failed to start call")
    },
  })

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
      // storageService.setCallSessionId(response.data?.id)
      toast.success(response.data?.message ?? "Call created successfully")
      setCallSessionId(callSessionId)
      if (!callSessionId) {
        toast.error('Call session ID was not returned')
        return
      }
    },

    onError: (error: AxiosError<{message: string}>) => {
      toast.error(error?.response?.data?.message ?? "Failed to create call")
    },
  })
  
  return {
    createCall,
    startCall,
    callSessionId,
  }
}

export default useCreateCall
