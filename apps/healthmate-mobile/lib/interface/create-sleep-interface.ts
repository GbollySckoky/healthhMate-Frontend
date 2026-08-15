export interface CreateSleep{
  sleep_date: string,
  hours_slept: number,
  quanlity: string
}

export type SleepValue = {
  selectedMood?: string;
  selectedEmoji?: boolean;
};

export type SleepReading = {
  id: number | string;
  sleep?: SleepValue;
  recordedAt?: string;
  createdAt?: string;
  status?: string;
};