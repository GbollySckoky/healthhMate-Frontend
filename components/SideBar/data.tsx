import { ROUTES } from '@/lib/Routes';
import { House, Wallet, Activity, CalendarDays, HouseWifi, User, Headset, Settings } from 'lucide-react';
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
        url: '#'
    },
    {
        id: 3,
        icon: <User size={18}  />,
        text: 'Patients',
        url: '#'
    },
    {
        id: 4,
        icon: <CalendarDays size={18} />,
        text: 'Appointments',
        url: '#'
    },
    {
        id: 5,
        icon: <Wallet size={18} />,
        text: 'Earnings & Transactions',
        url: '#'
    },
    {
        id: 6,
        icon: <HouseWifi size={18} />,
        text: 'Branches',
        url: '#'
    },
    {
        id: 7,
        icon: <Activity size={18} />,
        text: 'Reports & Analytics',
        url: '#'
    },
    {
        id: 8,
        icon: <Headset size={18} />,
        text: 'Support',
        url: '#'
    },
    {
        id: 9,
        icon: <Settings size={18} />,
        text: 'Settings',
        url: '#'
    },
]