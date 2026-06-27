export interface Appointment {
  id: number
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
}

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  isActive: boolean
}

export interface Doctor {
  id: number
  firstName: string
  lastName: string
  email: string
}

export interface Hospital {
  id: number
  hospitalName: string
  email: string
}
