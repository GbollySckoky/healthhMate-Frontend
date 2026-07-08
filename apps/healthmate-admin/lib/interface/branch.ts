export interface Branch {
  id: number
  branchName: string
  branchAddress: string
  phoneNumber: string
  state: string
  createdAt: string
  updatedAt: string
  doctors: Doctor[]
}

export interface Doctor {
  id: number
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  gender: string
  profile: Profile
}

export interface Profile {
  specialization: string
  consultationFee: number
  yearsOfExperience: number
  profilePicture: string
}
