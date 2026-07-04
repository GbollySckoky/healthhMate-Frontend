export interface Data {
  id: number
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  gender: string
  createdAt: string
  updatedAt: string
  hospital: Hospital
  profile: Profile
  availability: any[]
}

export interface Hospital {
  id: number
  hospitalName: string
  email: string
  phoneNumber: string
}

export interface Profile {
  bio: string
  specialization: string
  consultationFee: number
  yearsOfExperience: number
  profilePicture: string
  licenseNumber: string
}
