import { LogIn } from "../interface/login.interface";
import { Profile } from "../interface/register.interface";
import { DOCTOR_SIGNUP, Signup } from "../interface/signup-interface";
import { ADMIN_ENDPOINTS } from "../constant/endpoints";
import { BRANCH_INTERFACE, ASSIGN_BRANCH } from "../interface/branch.interface";
import api from "./client-https";
import { SUPPORT_TICKET, Message, ReplyToTicket  } from "../interface/supportTicket";


export const Hospital_Admin = {
    signup: async (payload: Signup) => {
        return await api.post(ADMIN_ENDPOINTS.SIGN_UP, payload); 
    },
    login: async (payload: LogIn) => {
        return await api.post(ADMIN_ENDPOINTS.LOGIN, payload); 
    },
    createProfile: async (payload: Profile) => {
        return await api.post(ADMIN_ENDPOINTS.CREATE_HOSPITAL_PROFILE, payload); 
    },
    getAllDoctor: async() => {
        const response = await api.get(ADMIN_ENDPOINTS.GET_ALL_DOCTORS);
        return response.data
    },
    createDoctor: async (payload: DOCTOR_SIGNUP) => {
        return await api.post(ADMIN_ENDPOINTS.CREATE_DOCTOR, payload);
    },
    getAllHospitals: async() => {
        const response = await api.get(ADMIN_ENDPOINTS.GET_ALL_HOSPITALS);
        return response.data
    },
    getProfile: async() => {
        const response = await api.get(ADMIN_ENDPOINTS.GET_HOSPITAL_PROFILE);
        return response.data
    },
    createBranch: async (payload: BRANCH_INTERFACE) => {
        return await api.post(ADMIN_ENDPOINTS.CREATE_BRANCH, payload); 
    },
    getBranch: async() => {
        const response = await api.get(ADMIN_ENDPOINTS.GET_ALL_BRANCH);
        return response.data
    },
     assignBranch: async (payload: ASSIGN_BRANCH) => {
        return await api.post(ADMIN_ENDPOINTS.ASSIGN_DOCTOR_TO_BRANCH, payload); 
    },
    getStats: async() => {
        const response = await api.get(ADMIN_ENDPOINTS.GET_STATS);
        return response.data
    },
    getAllAppointments: async(page = 1, limit = 10, q?: string, status?: string) => {
        const params = new URLSearchParams({})
        params.append('page', String(page));
        params.append('limit', String(limit))
        if(q) params.append("q", q);
        if(status) params.append("status", status)
        const response = await api.get(`${ADMIN_ENDPOINTS.GET_ALL_APPOINTMENT}?${params.toString()}`);
        return response.data
    },
    getDoctorDetails: async(id: string) => {
        const response = await api.get(`${ADMIN_ENDPOINTS.GET_DOCTOR_DETAILS}${id}`);
        return response.data
    },
    getAppointmentDetails: async(id: string) => {
        const response = await api.get(`${ADMIN_ENDPOINTS.GET_APPOINTMENT_DETAILS}${id}/appointments`);
         return response.data
    },
    createSupportTicket: async (payload: SUPPORT_TICKET) => {
        return await api.post(ADMIN_ENDPOINTS.CREATE_SUPPORT_TICKET, payload)
    },
    getMe: async() => {
        const response = await api.get(ADMIN_ENDPOINTS.GET_ME);
        return response.data
    },
    getNotification: async () => {
        const response = await api.get(ADMIN_ENDPOINTS.GET_NOTIFICATIONS);
        return response.data
    },
    markNotificationAsRead: async (id: string) => {
        const response = await api.patch(`notifications/hospital/${id}/read`);
        return response.data
    },
    unReadNotifications: async () => {
        const response = await api.get(ADMIN_ENDPOINTS.UN_READ_NOTIFICATIONS);
        return response.data
    },
    markAllNotificationAsRead: async () => {
        return await api.patch(ADMIN_ENDPOINTS.READ_ALL_NOTIFICATIONS);
    },
    getSupportTicket: async() => {
        const response = await api.get(ADMIN_ENDPOINTS.GET_SUPPORT);
        return response.data
    },
    getSupportDetails: async(id: string) => {
        const response = await api.get(`${ADMIN_ENDPOINTS.GET_SUPPORT_DETAILS}${id}`);
        return response.data
    },
    replyToTicket: async (id: string, payload: ReplyToTicket) => {
        return await api.post(`support/staff/${id}/replies`, payload)
    },
    addInternalNote: async (id: string, message: Message) => {
        return await api.post(`support/staff/${id}/internal-notes`, message)
    },
}
