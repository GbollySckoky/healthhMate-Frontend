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
        icon: <User size={18}  />,
        text: 'Patients',
        url: ROUTES.patients
    },
    {
        id: 3,
        icon: <CalendarDays size={18} />,
        text: 'Appointments',
        url: ROUTES.appointment
    },
    {
        id: 4,
        icon: <Wallet size={18} />,
        text: 'Earnings & Transactions',
        url: ROUTES.earnings
    },
    {
        id: 5,
        icon: <HouseWifi size={18} />,
        text: 'Messages',
        url: ROUTES.message
    },
    {
        id: 6,
        icon: <Activity size={18} />,
        text: 'Availability',
        url: ROUTES.login
    },
    {
        id: 7,
        icon: <Activity size={18} />,
        text: 'Profile',
        url: ROUTES.profile
    },
    {
        id: 8,
        icon: <Headset size={18} />,
        text: 'Support',
        url: ROUTES.support
    },
    {
        id: 9,
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

export const earningData = [
    {
        id: 2,
        about: 'Total Earnings',
        value: '₦170,000',
        percent: 12,
    },
    {
        id: 1,
        about: 'Earnings this Month',
        value: '₦70,000',
        percent: 12,
    },
    {
        id: 3,
        about: 'Pending Payouts',
        value: '₦780,000',
        percent: -14,
    },
    {
        id: 4,
        about: 'Completed Payouts',
        value: '₦670,000',
        percent: 10,
    }
]

export const transactionData = [
    {
        id: 1,
        about: 'Total Transactions',
        value: '142',
        percent: 12,
    },
    {
        id: 2,
        about: 'Pending Transactions ',
        value: '22',
        percent: 12,
    },
    {
        id: 3,
        about: 'Failed Transactions',
        value: '10',
        percent: -14,
    },
    {
        id: 4,
        about: 'Refunds Issued',
        value: '07',
        percent: 10,
    }
]

export const messages = [
    {
        name: 'Sharon Johnson',
        text: 'I would definitely shoot any opportunities I ....',
        time: '12.30',
        count: '2'
    }
]