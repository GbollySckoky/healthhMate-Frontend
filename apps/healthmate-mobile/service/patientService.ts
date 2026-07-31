import { Signup } from '@/lib/interface/signup-interface';
import { BloodPressure } from '@/lib/interface/blood-pressure';
import { Medication } from '@/lib/interface/medication';
import { Weight } from '@/lib/interface/weight';
import { Sleep } from '@/lib/interface/sleep';
import { Mood } from '@/lib/interface/mood';
import { Appointment } from '@/lib/interface/createAppointment';
import {
  GetAppointmentDetailsResponse,
  GetAppointmentsResponse,
} from '@/lib/interface/get-appointments-interface';
import { GetDoctorsResponse } from '@/lib/interface/get-doctors-interface';
import { GetOverview } from '@/lib/interface/get-overview-interface';
import { GetHospitalsResponse } from '@/lib/interface/get-hospitals-interface';
import { ReplyToTicket, SUPPORT_TICKET } from '@/lib/interface/support';
import { EditProfile, Profile } from '@/lib/interface/user';
import api from './clientHttps';
import { PATIENTS_ENDPOINTS } from '@/constants/endpoints';
import { login } from '@/lib/interface/login';
import { forgotPassword } from '@/lib/interface/forgotPassword';
import { verifyEmail } from '@/lib/interface/verifyEmail';

export const patientService = {
  login: async (payload: login) => {
    return await api.post(PATIENTS_ENDPOINTS.LOGIN, payload);
    // this returns the data because interceptor returns response.data
  },
  signup: async (payload: Signup) => {
    return await api.post(PATIENTS_ENDPOINTS.SIGNUP, payload);
  },
  forgotPassword: async (payload: forgotPassword) => {
    return await api.post(PATIENTS_ENDPOINTS.FORGOT_PASSWORD, payload);
  },
  verifyEmail: async (email: string | undefined, payload: verifyEmail) => {
    return await api.post(
      `${PATIENTS_ENDPOINTS.VERIFY_EMAIL}${email}`,
      payload
    );
  },
  createBloodPressue: async (payload: BloodPressure) => {
    return await api.post(PATIENTS_ENDPOINTS.BLOOD_PRESSURE, payload);
  },
  getBloodPressure: async () => {
    const response = await api.get(PATIENTS_ENDPOINTS.BLOOD_PRESSURE);
    return await response.data;
  },
  createMedication: async (payload: Medication) => {
    return await api.post(PATIENTS_ENDPOINTS.MEDICATION, payload);
  },
  getMedication: async () => {
    const response = await api.get(PATIENTS_ENDPOINTS.MEDICATION);
    return await response.data;
  },
  createWeight: async (payload: Weight) => {
    return await api.post(PATIENTS_ENDPOINTS.WEIGHT, payload);
  },
  getWeight: async () => {
    const response = await api.get(PATIENTS_ENDPOINTS.WEIGHT);
    return await response.data;
  },
  createMood: async (payload: Mood) => {
    return await api.post(PATIENTS_ENDPOINTS.MOOD, payload);
  },
  getMood: async () => {
    const response = await api.get(PATIENTS_ENDPOINTS.MOOD);
    return await response.data;
  },
  createSleep: async (payload: Sleep) => {
    return await api.post(PATIENTS_ENDPOINTS.SLEEP, payload);
  },
  getSleep: async () => {
    const response = await api.get(PATIENTS_ENDPOINTS.SLEEP);
    return await response.data;
  },
  createConsultation: async (payload: Appointment) => {
    return await api.post(PATIENTS_ENDPOINTS.BOOK_APPOINTMENT, payload);
  },
  getDoctors: async (hospitalId: string): Promise<GetDoctorsResponse> => {
    const response = await api.get(
      `${PATIENTS_ENDPOINTS.GET_ALL_DOCTORS}${hospitalId}/doctors`
    );
    return await response.data;
  },
  getHospitals: async (
    page = 1,
    limit = 10,
    q?: string
  ): Promise<GetHospitalsResponse> => {
    const params = new URLSearchParams({});
    if (page) params.append('page', String(page));
    if (limit) params.append('limit', String(limit));
    if (q) params.append('q', q);
    const response = await api.get(
      `${PATIENTS_ENDPOINTS.GET_ALL_HOSPITALS}?${params.toString()}`
    );
    return await response.data;
  },
  getDoctorById: async (doctorId: string) => {
    const response = await api.get(
      `${PATIENTS_ENDPOINTS.GET_DOCTOR}${doctorId}`
    );
    return await response.data;
  },
  getAppointments: async (
    page = 1,
    limit = 10,
    q?: string,
    status?: string
  ): Promise<GetAppointmentsResponse> => {
    const params = new URLSearchParams({});
    if (page) params.append('page', String(page));
    if (limit) params.append('limit', String(limit));
    if (q) params.append('q', q);
    if (status) params.append('status', status);
    const response = await api.get(
      `${PATIENTS_ENDPOINTS.GET_ALL_APPOINTMENT}?${params.toString()}`
    );
    return await response.data;
  },
  getAppointmentById: async (
    appointmentId: string
  ): Promise<GetAppointmentDetailsResponse> => {
    const response = await api.get(
      `${PATIENTS_ENDPOINTS.GET_APPOINTMENT}${appointmentId}/appointments`
    );
    return await response.data;
  },
  cancelAppointment: async (appointmentId: string) => {
    const response = await api.patch(
      `${PATIENTS_ENDPOINTS.CANCEL_APPOINTMENT}${appointmentId}/cancel`
    );
    return response.data;
  },
  getOverview: async (): Promise<GetOverview> => {
    const response = await api.get(PATIENTS_ENDPOINTS.GET_TRACK_OVERVIEW);
    return await response.data;
  },
  getNotification: async () => {
      const response = await api.get(PATIENTS_ENDPOINTS.GET_NOTIFICATIONS);
      return response.data
  },
  markNotificationAsRead: async (id: string) => {
      const response = await api.patch(`notifications/patient/${id}/read`);
      return response.data
  },
  unReadNotifications: async () => {
      const response = await api.get(PATIENTS_ENDPOINTS.UN_READ_NOTIFICATIONS);
      return response.data
  },
  markAllNotificationAsRead: async () => {
      return await api.patch(PATIENTS_ENDPOINTS.READ_ALL_NOTIFICATIONS);
  },
  getSupportTicket: async() => {
      const response = await api.get(PATIENTS_ENDPOINTS.GET_SUPPORT);
      return response.data
  },
  getSupportDetails: async(id: string) => {
      const response = await api.get(`${PATIENTS_ENDPOINTS.GET_SUPPORT_DETAILS}${id}`);
      return response.data
  },
  replyToTicket: async (id: string, payload: ReplyToTicket) => {
      return await api.post(`support/patient/${id}/replies`, payload)
  },
  getMe: async () => {
      const response = await api.get(PATIENTS_ENDPOINTS.GET_ME);
      return response.data
  },
  createProfile: async (payload: Profile) => {
      return await api.post(PATIENTS_ENDPOINTS.CREATE_PROFILE, payload)
  },
  editProfile: async (payload: EditProfile) => {
      return await api.post(PATIENTS_ENDPOINTS.CREATE_PROFILE, payload)
  },
  createSupportTicket: async (payload: SUPPORT_TICKET) => {
      return await api.post(PATIENTS_ENDPOINTS.CREATE_SUPPORT, payload)
  },
};
