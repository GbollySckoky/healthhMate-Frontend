import admin from "../admin";
import { LOGIN } from "../interface/login.interface";
import { SIGNUP } from "../interface/sign-up.interface";
import { DOCTOR_ENDPOINTS } from "./endpoints";
import { ApproveAppointment } from "../interface/approve-appointment.interface";
import api from "../ClientHttps";
// import { DOCTOR_PROFILE } from "@/interface/doctor-profile.interface";


export const Doctor = {
    signup: async (payload: SIGNUP) => {
        return await admin.post(DOCTOR_ENDPOINTS.SIGN_UP, payload); 
    },
    login: async (payload: LOGIN) => {
        return await api.post(DOCTOR_ENDPOINTS.LOGIN, payload); 
    },
    getAppointment: async (
        // status?: string,consultation_type?: string, patient_name?: string, patient_email?: string
    ) => {
        // const params = new URLSearchParams({
        // })
        // if(status) params.append("status", status)
        // if(consultation_type) params.append("consultation_type", consultation_type)
        // if(patient_name) params.append("patient_name", patient_name)
        // if(patient_email) params.append("patient_email", patient_email)
        const response = await api.get(`${DOCTOR_ENDPOINTS.GET_APPOINTMENT}`); 
        return await response.data
    },
    getPayout: async () => {
        const response = await api.get(DOCTOR_ENDPOINTS.GET_PAYMENT); 
        return await response.data
    },
    getEarnings: async () => {
        const response = await api.get(DOCTOR_ENDPOINTS.GET_EARNINGS_SUMMARY); 
        return await response.data
    },
    getDoctor: async() => {
        const response = await api.get(DOCTOR_ENDPOINTS.GET_DOCTOR);
        return response.data
    },
    getAppointmentDetail: async(appointment_id: string) => {
        const response = await api.get(`${DOCTOR_ENDPOINTS.GET_APPOINTMENT_DETAILS}${appointment_id}/`);
        return response.data
    },
    approveAppointment: async(appointment_id: string, payload: ApproveAppointment) => {
        return await api.patch(`${DOCTOR_ENDPOINTS.GET_APPOINTMENT_DETAILS}${appointment_id}/update/`,payload)
    },
    createProfile: async (payload: FormData) => {
        return await api.post(DOCTOR_ENDPOINTS.CREATE_PROFILE, payload); 
    }
    
    // registerAccount: async (payload: Register) => {
    //     return await adminAPI.post(DOCTOR_ENDPOINTS.REGISTER, payload); 
    // }
}