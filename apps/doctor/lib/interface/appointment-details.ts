export interface AppointmentDetails {
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
  note: string
  createdAt: string
  updatedAt: string
}
