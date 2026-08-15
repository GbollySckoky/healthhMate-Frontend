export interface BloodPressure {
    systolic: number
    diastolic: number
    date_recorded: string
    time_recorded: string
}
  

export type BloodPressureReading = {
  id: number | string;
  systolic: string | number;
  diastolic: string | number;
  createdAt?: string;
  recordedAt?: string;
};