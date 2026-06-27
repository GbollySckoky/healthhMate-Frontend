export interface DoctorProfile {
    email: string
    phone_number: string
    full_name: string
    gender: string
    date_of_birth: string
    address: string
    hospital: string
    branch: string
    specialization: string
    bio: string
    doctor_documents: DoctorDocuments
    license_number: string
    date_joined: string
  }
  
  export interface DoctorDocuments {
    license_number: string
    license_file: string
    degree_certificate: string
    board_certificate: string
  }
  