export interface DOCTOR_PROFILE {
  id: number
  email: string
  password: string
  phoneNumber: string
  firstName: string
  lastName: string
  gender: string
  dateOfBirth: string
  hospitalId: number
  createdAt: string
  updatedAt: string
  hospital: Hospital
  profile: Profile
}

export interface Hospital {
  id: number
  email: string
  password: string
  phoneNumber: string
  hospitalName: string
  dateOfEstablishment: string
  createdAt: string
  updatedAt: string
}

export interface Profile {
  id: number
  doctorId: number
  consultationFee: number
  licenseNumber: string
  profilePicture: string
  yearsOfExperience: number
  bio: string
  specialization: string
  createdAt: string
  updatedAt: string
}


export interface SEARCH_QUERY{
  healthConcern: string;
  consultationType: string
  user: User
  hospital: Hospital
}

export interface User{
  firstName:  string;
  lastName: string
}

export interface Hospital{
  hospitalName:  string;
}