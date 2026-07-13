import admin from "../admin";
import { LOGIN } from "../interface/login.interface";
import { SIGNUP } from "../interface/sign-up.interface";
import { DOCTOR_ENDPOINTS } from "./endpoints";
import { ApproveAppointment } from "../interface/approve-appointment.interface";
import api from "../ClientHttps";
import { Availability } from "../interface/availability.interface";


export const Doctor = {
    signup: async (payload: SIGNUP) => {
        return await admin.post(DOCTOR_ENDPOINTS.SIGN_UP, payload); 
    },
    login: async (payload: LOGIN) => {
        return await api.post(DOCTOR_ENDPOINTS.LOGIN, payload); 
    },
    getAppointment: async (
       page = 1, limit = 10, status?: string, q?: string
    ) => {
        const params = new URLSearchParams({
        })
        params.append("page", String(page))
        params.append("limit", String(limit))
        if(status) params.append("status", status)
        if(q) params.append("q", q)
        // if(q?.healthConcern) params.append("healthConcern", q.healthConcern)
        // if(q?.user?.firstName) params.append("firstName", q?.user?.firstName)
        // if(q?.user?.lastName) params.append("lastName", q?.user?.lastName)
        // if(q?.hospital?.hospitalName) params.append("hospitalName", q?.hospital?.hospitalName)
        const response = await api.get(`${DOCTOR_ENDPOINTS.GET_APPOINTMENT}?${params.toString()}`); 
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
        const response = await api.get(`${DOCTOR_ENDPOINTS.GET_APPOINTMENT_DETAILS}${appointment_id}/appointments`);
        return response.data
    },
    approveAppointment: async(appointment_id: string, payload: ApproveAppointment) => {
        return await api.patch(`${DOCTOR_ENDPOINTS.APPROVE_APPOINTMENT}${appointment_id}/approve`,payload)
    },
    createProfile: async (payload: FormData) => {
        return await api.post(DOCTOR_ENDPOINTS.CREATE_PROFILE, payload); 
    },
    createDoctorAvailability: async (payload: Availability) => {
        return await api.post(DOCTOR_ENDPOINTS.CREATE_DOCTOR_AVAILABILITY, payload); 
    },
    rejectAppointment: async (appointment_id: string, payload: ApproveAppointment) => {
        return await api.patch(`${DOCTOR_ENDPOINTS.REJECT_APPOINTMENT}${appointment_id}/reject`, payload); 
    },
    getStats: async() => {
        const response = await api.get(DOCTOR_ENDPOINTS.GET_APPOINTMENT_STATS);
        return response.data
    },
}