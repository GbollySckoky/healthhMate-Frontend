import Clienthttps from "../client-https";
import { Signup } from "../interface/signup-interface";
import { ADMIN_ENDPOINTS } from "./endpoints";

export const Hospital_Admin = {
    signup: async (payload: Signup) => {
        return await Clienthttps().post(ADMIN_ENDPOINTS.SIGN_UP, payload); 
    },
}