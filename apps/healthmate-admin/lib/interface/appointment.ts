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
