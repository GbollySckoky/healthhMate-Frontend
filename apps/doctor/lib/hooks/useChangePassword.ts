import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { Doctor } from '../constant/service'
import { ChangePassword } from '../interface/change-password'

const useChangePassword = () => {
    const mutation = useMutation({
        mutationKey: ['change-password'],
        mutationFn: (payload: ChangePassword) => Doctor.changePassword(payload),
        onSuccess: (response) => {
            toast.success(response.data.message ?? 'Password updated successfully')
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error.response?.data.message ?? 'Unable to update password. Please try again.')
        }
    })

    return {
        isPending: mutation.isPending,
        isSuccess: mutation.isSuccess,
        mutation: mutation.mutate
    }
}

export default useChangePassword
