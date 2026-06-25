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
  liscenceNumber: string
  profilePicture: string
  yearsOfExperience: number
  bio: string
  specialization: string
  createdAt: string
  updatedAt: string
}
