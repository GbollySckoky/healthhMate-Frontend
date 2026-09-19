import { useMutation } from "@tanstack/react-query"
import { Doctor } from "../constant/service"
import { toast } from "react-toastify"
import { AxiosError } from "axios"
import { ConsultationNote } from "../interface/prescription"

const useCreateConsultation = (id: string) => {
    const consultationNote = useMutation({
        mutationKey: ['consultationNote'],
        mutationFn: (payload: ConsultationNote) => {
            if (!id) {
                throw new Error('id is required')
            }
        return Doctor.createConsultationNote(id, payload)},
        onSuccess: (response) => {
            toast.success(response.data.message)
        },
        onError: (error: AxiosError<{message: string | undefined}>) => {
            toast.error(error?.response?.data.message)
        }
    })
  return {consultationNote}
}

export default useCreateConsultation