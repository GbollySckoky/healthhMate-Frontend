export const getMoodEmoji = (mood?: string) => {
  switch (mood) {
    case 'Happy':
      return '🙂';
    case 'Laughing':
      return '😂';
    case 'Angry':
      return '😡';
    case 'Sick':
      return '🤢';
    case 'Tired':
      return '🥱';
    default:
      return '🙂';
  }
};

export const getMoodStatus = (mood?: string) => {
  if (mood === 'Happy' || mood === 'Laughing') return 'Positive';
  if (mood === 'Angry' || mood === 'Sick' || mood === 'Tired') return 'Low';
  return 'Logged';
};

export const statusStyles: Record<string, { bg: string; text: string }> = {
  Positive: { bg: '#ECFDF3', text: '#027A48' },
  Low: { bg: '#FEF3F2', text: '#B42318' },
  Balanced: { bg: '#FFFAEB', text: '#B54708' },
  Logged: { bg: '#F4F3FF', text: '#5924DC' },
};