// import { patientService } from '@/service/patientService'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { toast } from "react-toastify";
import { Doctor } from '../constant/service';

const useCreateCall = (communicationId?: string) => {
  const [callSessionId, setCallSessionId] = useState<string | null>(null)

  const createCall = useMutation({
    mutationKey: ['createCall', communicationId],

    mutationFn: () => {
      if (!communicationId) {
        throw new Error('communicationId is required')
      }

      return Doctor.createCall(communicationId)
    },

    onSuccess: (response) => {
      const callSessionId = response.data?.id

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
    // startCall,
    callSessionId,
  }
}

export default useCreateCall