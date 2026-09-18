export type AppointmentStatus = 'PENDING' | 'UPCOMING' | 'COMPLETED' | 'CANCELLED' | string;

export interface AppointmentDoctor {
  id?: number;
  firstName?: string;
  lastName?: string;
  name?: string;
  fullName?: string;
  specialty?: string;
  profile: DoctorProfile
  image?: string | null;
  email?: string;
  title: string
  department: string
}

export interface DoctorProfile{
 specialization?: string;
  profilePicture?: string | null;
}

export interface AppointmentUser {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  isActive?: boolean;
  profile?: string | null;
}

export interface AppointmentHospital {
  id: number;
  hospitalName: string;
  email: string;
}

export interface GetAppointment {
  id: number;
  amount: number;
  consultationType: string;
  createdAt: string;
  date: string;
  doctor: AppointmentDoctor | null;
  healthConcern: string;
  note: string | null;
  status: AppointmentStatus;
  time: string;
  user: AppointmentUser | null;
  hospital?: AppointmentHospital | null;
  approvalStatus: string
}

export interface PaginationMeta {
  limit: number;
  page: number;
  total: number;
  totalPages: number;
}

export interface GetAppointmentsResponse {
  data: GetAppointment[];
  message: string;
  meta: PaginationMeta;
}

export interface GetAppointmentDetailsResponse {
  data: GetAppointment;
  message: string;
}
