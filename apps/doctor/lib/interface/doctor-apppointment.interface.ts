export interface Appointment {
  id: string
  date: string
  time: string
  consultationType: string
  healthConcern: string
  amount: number
  status: string
  createdAt: string
  user: User
  doctor: Doctor
  hospital: Hospital
  approvalStatus: string
  note?: string
}

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  isActive: boolean
  profile: UserProfile
}
export interface UserProfile{
  healthCondition: string
  gender: string
  profilePicture: string
}
export interface Doctor {
  id: string
  firstName: string
  lastName: string
  email: string
}

export interface Hospital {
  id: string
  hospitalName: string
  email: string
}
