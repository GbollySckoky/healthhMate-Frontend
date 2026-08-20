export const ROUTES = {
    forgotPassword: '/auth/forgot-password',
    login: '/auth/login',
    signup: '/auth/signup',
    reportIssue: '/home/report-issues',
    home: '/',
    track: '/track',
    consultation: '/consultations',
    messages: '/(tabs)/messages',
    signUpSuccess: '/auth/success',
    about: '/auth/about',
    welcome: '/auth/welcome',
    profile: '/profile',
    settings: '/settings',
    reminder: '/profile/reminder',
    addReminder: '/profile/reminder/add-reminder',
    allReminders: '/home/all-reminders',
    allAppointments: "/consultations/all-hospitals",
    doctorsHospitals: '/consultations/doctors-hospitals',
    consultationPayment: '/consultations/payment',
    bloodPressure: '/track/blood-pressure',
    mood: '/track/mood',
    sleep: '/track/sleep-log',
    weight: '/track/weight',
    medication: '/track/medication',
    onnBoarding: '/onboarding',
    allApointments: '/home/all-appointments',
    topRatedDoctors: "/consultations/top-rated-doctors",
    bookDoctors: '/consultations/consultation-details/book-doctor',
    editProfileName: '/profile/edit-profile',
    support: '/support',
    appointments: '/appointments',
    notifications: '/notifications',
    // settings: '/settings'
} as const;

export const doctorProfileRoute = (doctorId: string | number) =>
    `/consultations/consultation-details/${doctorId}`;

export type RouteValues = typeof ROUTES[keyof typeof ROUTES];
// This creates: '/auth/forgot-password' | '/auth/login' | '/auth/signup'
