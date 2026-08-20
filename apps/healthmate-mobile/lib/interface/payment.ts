export interface InitializePayment {
  appointmentId: string
  currency: string,
  metadata: Appointment
}

interface Appointment {
  date: string
  time: string
  consultationType: string
  healthConcern: string
  doctorId: string
  hospitalId: string
  amount: number
}
