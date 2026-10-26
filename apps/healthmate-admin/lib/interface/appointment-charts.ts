export interface AppointmentTrend {
  month: string;
  scheduled: number;
  completed: number;
  cancelled: number;
}

export interface DepartmentConsultations {
  department: string;
  count: number;
}

export interface AppointmentChartsResponse {
  message: string;
  data: {
    year: number;
    timezone: string;
    period: { startDate: string; endDateExclusive: string };
    scheduledDefinition: string;
    appointmentTrends: AppointmentTrend[];
    consultationsByDepartment: {
      total: number;
      departments: DepartmentConsultations[];
    };
  };
}
