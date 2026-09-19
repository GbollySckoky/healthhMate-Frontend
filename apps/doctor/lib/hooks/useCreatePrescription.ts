import { useMutation } from "@tanstack/react-query"
import { Doctor } from "../constant/service"
import { toast } from "react-toastify"
import { AxiosError } from "axios"
import { Prescription } from "../interface/prescription"

const useCreatePrescription = (id: string) => {
    const prescription = useMutation({
        mutationKey: ['prescription'],
        mutationFn: (payload: Prescription) => {
            if (!id) {
                throw new Error('id is required')
            }
        return Doctor.createPrescription(id, payload)},
        onSuccess: (response) => {
            toast.success(response.data.message)
        },
        onError: (error: AxiosError<{message: string | undefined}>) => {
            toast.error(error?.response?.data.message)
        }
    })
  return {prescription}
}

export default useCreatePrescription