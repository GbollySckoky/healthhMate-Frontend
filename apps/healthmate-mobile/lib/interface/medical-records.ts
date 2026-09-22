export interface MedicalRecords {
  patient: Patient
  prescriptions: Prescription[]
  consultationNotes: ConsultationNote[]
}

export interface Patient {
  id: string
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  profile: Profile
}

export interface Profile {
  id: string
//   firstName: any
//   lastName: any
  dateOfBirth: string
  gender: string
  healthCondition: string
  allergies: string
  profilePicture: string
  bloodGroup: string
}

export interface Prescription {
  id: string
  prescription: string
  dosage: string
  frequency: string
  duration: string
  prescribedBy: string
  userId: string
  doctorId: string
  appointmentId: string
  hospitalId: string
  createdAt: string
  updatedAt: string
  doctor: Doctor
  hospital: Hospital
  appointment: Appointment
}

export interface Doctor {
  id: string
  firstName: string
  lastName: string
  title: string
}

export interface Hospital {
  id: string
  hospitalName: string
}

export interface Appointment {
  id: string
  userId: string
  doctorId: string
  hospitalId: string
  date: string
  time: string
  consultationType: string
  healthConcern: string
  amount: number
  status: string
  approvalStatus: string
  note: string
  createdAt: string
  updatedAt: string
}

export interface ConsultationNote {
  id: string
  consultationNote: string
  userId: string
  doctorId: string
  appointmentId: string
  hospitalId: string
  createdAt: string
  updatedAt: string
  doctor: Doctor2
  hospital: Hospital2
  appointment: Appointment2
}

export interface Doctor2 {
  id: string
  firstName: string
  lastName: string
  title: string
}

export interface Hospital2 {
  id: string
  hospitalName: string
}

export interface Appointment2 {
  id: string
  userId: string
  doctorId: string
  hospitalId: string
  date: string
  time: string
  consultationType: string
  healthConcern: string
  amount: number
  status: string
  approvalStatus: string
  note: string
  createdAt: string
  updatedAt: string
}
