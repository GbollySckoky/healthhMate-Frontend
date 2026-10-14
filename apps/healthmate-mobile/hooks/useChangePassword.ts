import { ChangePassword } from '@/lib/interface/change-password'
import { patientService } from '@/service/patientService'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

const useChangePassword = () => {
    const mutation = useMutation({
        mutationKey: ['change-password'],
        mutationFn: (payload: ChangePassword) => patientService.changePassword(payload),
        onSuccess: (response) => {
            toast.success(response.data.message)
        }, 
        onError: (error: AxiosError<{message: string}>) => {
            toast.error(error.response?.data.message)
        }
    })
    // const {} = mutation
  return {
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    mutation: mutation.mutate
  }
}

export default useChangePassword
