import ClientHttps from "../ClientHttps";
import admin from "../admin";
// import adminAPI from "../admin";
import { LOGIN } from "../interface/login.interface";
// import { Register } from "../interface/register.interface";
import { SIGNUP } from "../interface/sign-up.interface";
import { DOCTOR_ENDPOINTS } from "./endpoints";


export const Doctor = {
    signup: async (payload: SIGNUP) => {
        return await admin.post(DOCTOR_ENDPOINTS.SIGN_UP, payload); 
    },
    login: async (payload: LOGIN) => {
        return await ClientHttps().post(DOCTOR_ENDPOINTS.LOGIN, payload); 
    },
    getAppointment: async () => {
        const response = await ClientHttps().get(DOCTOR_ENDPOINTS.GET_APPOINTMENT); 
        return await response.data
    },
    // registerAccount: async (payload: Register) => {
    //     return await adminAPI.post(DOCTOR_ENDPOINTS.REGISTER, payload); 
    // }
}