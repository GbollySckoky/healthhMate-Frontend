export interface CreateMedication{
    medication_name: string,
    dosage: string,
    date_taken: string,
    time_taken?: string
}

export type MedicationReading = {
  id: number | string;
  name?: string;
  dosage?: string;
  recordedAt?: string;
  createdAt?: string;
  status?: string;
};