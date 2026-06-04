import adminAPI from "./admin";
import Clienthttps from "./client-https";
import { LogIn } from "../interface/login.interface";
import { Register } from "../interface/register.interface";
import { DOCTOR_SIGNUP, Signup } from "../interface/signup-interface";
import { ADMIN_ENDPOINTS } from "../constant/endpoints";

export const Hospital_Admin = {
    signup: async (payload: Signup) => {
        return await Clienthttps().post(ADMIN_ENDPOINTS.SIGN_UP, payload); 
    },
    login: async (payload: LogIn) => {
        return await Clienthttps().post(ADMIN_ENDPOINTS.LOGIN, payload); 
    },
    createProfile: async (payload: Register) => {
        return await adminAPI.post(ADMIN_ENDPOINTS.CREATE_HOSPITAL_PROFILE, payload); 
    },
    getAllDoctor: async() => {
        const response = await Clienthttps().get(ADMIN_ENDPOINTS.GET_ALL_DOCTORS);
        return response.data
    },
    createDoctor: async (payload: DOCTOR_SIGNUP) => {
        return await Clienthttps().post(ADMIN_ENDPOINTS.CREATE_DOCTOR, payload);
    },
    getAllHospitals: async() => {
        const response = await Clienthttps().get(ADMIN_ENDPOINTS.GET_ALL_HOSPITALS);
        return response.data
    },
    getProfile: async() => {
        const response = await Clienthttps().get(ADMIN_ENDPOINTS.GET_HOSPITAL_PROFILE);
        return response.data
    },
}