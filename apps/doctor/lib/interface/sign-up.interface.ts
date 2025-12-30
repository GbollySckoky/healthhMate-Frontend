export interface SIGNUP {
  email: string
  full_name: string
  phone_number: string
  password1: string
  password2: string
  date_of_birth: string
  gender: string
  specialization: string
  years_of_experience: string
  bio: string
  consultation_fee: string
  currency: string
  video_consultation: boolean
  audio_consultation: boolean
  inperson_consultation: boolean
  days: string[]
  time: string[]
  license_number: string
  license: File
  degree_certificate: File
  board_certificate: File
}
