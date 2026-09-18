export interface DoctorHospital {
  id: number;
  hospitalName: string;
  email?: string;
}

export interface DoctorProfile {
  specialization?: string | null;
  consultationFee?: number | string | null;
  profilePicture?: string | null;
  bio?: string | null;
  yearsOfExperience?: number | string | null;
}

export interface GetDoctor {
  id: number;
  firstName?: string | null;
  lastName?: string | null;
  fullName?: string | null;
  email?: string | null;
  profilePicture?: string | null;
  image?: string | null;
  profile?: DoctorProfile | null;
  hospital?: DoctorHospital | null;
  title?: string | undefined;
  department?: string| undefined
}

export interface GetDoctorsResponse {
  data: GetDoctor[];
  message: string;
}
