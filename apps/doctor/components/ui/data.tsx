import { House, Wallet, Activity, CalendarDays, HouseWifi, User, Headset, Settings } from 'lucide-react';
import { ROUTES } from '@/lib/routes';
import image from '@/assets/Image.png'
import image1 from '@/assets/Image (1).png'

export const sideBarData = [
    {
        id: 1,
        icon: <House size={18} />,
        text: 'Dashboard',
        url: ROUTES.dashboard
    },
    {
        id: 2,
        icon: <House size={18} />,
        text: 'Doctors',
        url: ROUTES.doctors
    },
    {
        id: 3,
        icon: <User size={18}  />,
        text: 'Patients',
        url: ROUTES.patients
    },
    {
        id: 4,
        icon: <CalendarDays size={18} />,
        text: 'Appointments',
        url: ROUTES.appointment
    },
    {
        id: 5,
        icon: <Wallet size={18} />,
        text: 'Earnings & Transactions',
        url: ROUTES.earnings
    },
    {
        id: 6,
        icon: <HouseWifi size={18} />,
        text: 'Messages',
        url: ROUTES.branches
    },
    {
        id: 7,
        icon: <Activity size={18} />,
        text: 'Availability',
        url: ROUTES.report
    },
    {
        id: 8,
        icon: <Activity size={18} />,
        text: 'Profile',
        url: ROUTES.report
    },
    {
        id: 9,
        icon: <Headset size={18} />,
        text: 'Support',
        url: ROUTES.support
    },
    {
        id: 10,
        icon: <Settings size={18} />,
        text: 'Settings',
        url: ROUTES.settings
    },
]

export const overviewData = [
    {
        id: 1,
        about: 'Completed Consultations',
        value: '15',
        percent: 12,
    },
    {
        id: 2,
        about: 'Pending Requests',
        value: '175',
        percent: 12,
    },
    {
        id: 3,
        about: 'Avg Rating',
        value: '05',
        percent: -14,
    },
    {
        id: 4,
        about: 'Cancelled Consultation',
        value: '15',
        percent: 10,
    },
]

export const recentActivities = [
    {
        title:'New consultation booked',
        info: 'Patient: Lilian Obasi booked Dr. James Uche',
        time: '11:30am',
    },
    {
        title:'New consultation booked',
        info: 'Patient: Lilian Obasi booked Dr. James Uche',
        time: '11:30am',
    },
    {
        title:'New consultation booked',
        info: 'Patient: Lilian Obasi booked Dr. James Uche',
        time: '11:30am'
    },
]

export const upcomingConsultation =[
    {
        title: 'Dr. Sarah Okoro',
        time:'2:00PM',
        date: 'June 15',
        callType: "Video Call",
        img: image,
        patient: 'Janet N.',
    },
    {
        title: 'Dr. Sarah Okoro',
        time:'2:00PM',
        date: 'June 15',
        callType: "Video Call",
        img: image1,
        patient: 'Janet N.'
    }, 
    {
        title: 'Dr. Sarah Okoro',
        time:'2:00PM',
        date: 'June 15',
        callType: "Video Call",
        img: image,
        patient: 'Janet N.'
    },
    {
        title: 'Dr. Sarah Okoro',
        time:'2:00PM',
        date: 'June 15',
        callType: "Video Call",
        img: image,
        patient: 'Janet N.'
    },
    {
        title: 'Dr. Sarah Okoro',
        time:'2:00PM',
        date: 'June 15',
        callType: "Video Call",
        img: image,
        patient: 'Janet N.'
    },
    {
        title: 'Dr. Sarah Okoro',
        time:'2:00PM',
        date: 'June 15',
        callType: "Video Call",
        img: image,
        patient: 'Janet N.'
    },
]