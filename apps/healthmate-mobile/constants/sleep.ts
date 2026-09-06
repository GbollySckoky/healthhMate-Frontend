export const getSleepEmoji = (sleepQuality?: string) => {
  switch (sleepQuality) {
    case "Excellent":
      return "😴";
    case "Average":
      return "😐";
    case "Poor":
      return "😩";
    default:
      return "🌙";
  }
};

export const getSleepStatus = (sleepQuality?: string) => {
  if (sleepQuality === "Excellent") return "Excellent";
  if (sleepQuality === "Average") return "Average";
  if (sleepQuality === "Poor") return "Low";
  return "Logged";
};

export const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  Excellent: { bg: "#ECFDF3", text: "#027A48" },
  Average: { bg: "#FFFAEB", text: "#B54708" },
  Low: { bg: "#FEF3F2", text: "#B42318" },
  Logged: { bg: "#F4F3FF", text: "#5924DC" },
};
export const getStatusColors = (status: string) => STATUS_COLORS[status] ?? STATUS_COLORS.Logged;