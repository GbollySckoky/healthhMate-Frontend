export interface SUPPORT_TICKET {
  subject: string;
  category: string;
  description: string;
  message: string;
  patientId: string;
  appointmentId: string;
  doctorId: string;
  attachmentUrl?: string;
  attachmentName?: string;
}

// enum CATEGTORY {
//     ACCOUNT = 'ACCOUNT',
//     APPOINTMENT = 'APPOINTMENT',
//     BILLING = 'BILLING',
//     TECHNICAL = 'TECHNICAL',
//     MEDICAL = 'MEDICAL',
//     OTHER = 'OTHER'
// }