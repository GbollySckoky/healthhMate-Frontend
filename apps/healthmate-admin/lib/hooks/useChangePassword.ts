import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { Hospital_Admin } from '../service/service'
import { ChangePassword } from '../interface/change-password'

const useChangePassword = () => {
    const mutation = useMutation({
        mutationKey: ['change-password'],
        mutationFn: (payload: ChangePassword) => Hospital_Admin.changePassword(payload),
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
