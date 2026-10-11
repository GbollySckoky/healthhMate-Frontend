export const adminQueryKeys = {
  appointments: (page = 1, limit = 10, search = "", status?: string) =>
    ["appointment", page, limit, search, status] as const,
  doctors: (search = "", page = 1, limit = 10) =>
    ["getAllDoctor", search, page, limit] as const,
  doctor: (id: string) => ["doctor", id] as const,
  branches: (search = "", page = 1, limit = 10) =>
    ["branch", search, page, limit] as const,
};
