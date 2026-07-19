export interface SUPPORT_TICKET {
  subject: string;
  category: string;
  description: string;
  message: string;
  patientId: string;
  appointmentId: string;
  hospitalId: string;
  attachmentUrl?: string;
  attachmentName?: string;
}

type SupportTicketCategory = 'ACCOUNT' | 'APPOINTMENT' | 'BILLING' | string; // fill in full enum from your Prisma schema
type SupportTicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'; // adjust to match your actual enum
type SupportTicketStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED'; // adjust to match your actual enum
type SupportCreatorType = 'USER' | 'DOCTOR' | 'HOSPITAL';

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  subject: string;
  category: SupportTicketCategory;
  priority: SupportTicketPriority;
  status: SupportTicketStatus;
  description: string;
  creatorType: SupportCreatorType;
  createdByUserId: string | null;
  createdByDoctorId: string | null;
  createdByHospitalId: string | null;
  patientId: string | null;
  doctorId: string | null;
  hospitalId: string;
  appointmentId: string | null;
  resolvedAt: string | null; // ISO date string
  closedAt: string | null;   // ISO date string
  createdAt: string;         // ISO date string
  updatedAt: string;         // ISO date string
}

export interface ReplyToTicket {
  message: string,
  attachmentUrl: string,
  attachmentName: string
}

// enum CATEGTORY {
//     ACCOUNT = 'ACCOUNT',
//     APPOINTMENT = 'APPOINTMENT',
//     BILLING = 'BILLING',
//     TECHNICAL = 'TECHNICAL',
//     MEDICAL = 'MEDICAL',
//     OTHER = 'OTHER'
// }