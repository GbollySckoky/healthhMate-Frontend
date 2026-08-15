export interface CreateMood {
    mood: string,
    reason: string,
    recorded_at: string
}

export type MoodValue = {
  selectedMood?: string;
  selectedEmoji?: boolean;
};

export type MoodReading = {
  id: number | string;
  mood?: MoodValue;
  notes?: string;
  recordedAt?: string;
  createdAt?: string;
  status?: string;
};