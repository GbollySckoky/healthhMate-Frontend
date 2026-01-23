import adminAPI from "../admin";
import Clienthttps from "../client-https";
import { LogIn } from "../interface/login.interface";
import { Register } from "../interface/register.interface";
import { Signup } from "../interface/signup-interface";
import { ADMIN_ENDPOINTS } from "./endpoints";

export const Hospital_Admin = {
    signup: async (payload: Signup) => {
        return await Clienthttps().post(ADMIN_ENDPOINTS.SIGN_UP, payload); 
    },
    login: async (payload: LogIn) => {
        return await Clienthttps().post(ADMIN_ENDPOINTS.LOGIN, payload); 
    },
    registerAccount: async (payload: Register) => {
        return await adminAPI.post(ADMIN_ENDPOINTS.REGISTER, payload); 
    },
    getAllDoctor: async() => {
        const response = await Clienthttps().get(ADMIN_ENDPOINTS.GET_ALL_DOCTORS);
        return response.data
    },
}