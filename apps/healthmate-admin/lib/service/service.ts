import adminAPI from "./admin";
import { LogIn } from "../interface/login.interface";
import { Profile } from "../interface/register.interface";
import { DOCTOR_SIGNUP, Signup } from "../interface/signup-interface";
import { ADMIN_ENDPOINTS } from "../constant/endpoints";
import { BRANCH_INTERFACE, ASSIGN_BRANCH } from "../interface/branch.interface";
import api from "./client-https";


export const Hospital_Admin = {
    signup: async (payload: Signup) => {
        return await api.post(ADMIN_ENDPOINTS.SIGN_UP, payload); 
    },
    login: async (payload: LogIn) => {
        return await api.post(ADMIN_ENDPOINTS.LOGIN, payload); 
    },
    createProfile: async (payload: Profile) => {
        return await adminAPI.post(ADMIN_ENDPOINTS.CREATE_HOSPITAL_PROFILE, payload); 
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
    getAllAppointments: async() => {
        const response = await api.get(ADMIN_ENDPOINTS.GET_ALL_APPOINTMENT);
        return response.data
    },
    getDoctorDetails: async(id: number) => {
        const response = await api.get(`${ADMIN_ENDPOINTS.GET_DOCTOR_DETAILS}${id}`);
        return response.data
    },
}