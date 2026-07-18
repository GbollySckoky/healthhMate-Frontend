export interface APPOINTMENT {
  id: number
  userId: number
  doctorId: number
  hospitalId: number
  date: string
  time: string
  consultationType: string
  healthConcern: string
  amount: number
  status: string
  note: any
  createdAt: string
  updatedAt: string
}


export interface APPOINTMENT_DETAILS {
  id: string
  date: string
  time: string
  consultationType: string
  healthConcern: string
  amount: number
  status: string
  note: any
  createdAt: string
  user: User
  doctor: Doctor
  hospital: Hospital
}

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  isActive: boolean
  profile: any
}

export interface Doctor {
  id: string
  firstName: string
  lastName: string
  email: string
  gender: string
  dateOfBirth: string
  profile: Profile
}

export interface Profile {
  specialization: string
  licenseNumber: string
  consultationFee: number
  yearsOfExperience: number
}

export interface Hospital {
  id: string
  hospitalName: string
  email: string
}
