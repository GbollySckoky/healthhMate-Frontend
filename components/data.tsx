import image1 from '@/assets/Image (1).png' 
import image from '@/assets/Image.png'
import { permission } from 'process'

export const overviewData = [
    {
        id: 1,
        about: 'Total Doctors',
        value: '15',
        percent: 12,
    },
    {
        id: 2,
        about: 'Registered Patients',
        value: '175',
        percent: 12,
    },
    {
        id: 3,
        about: 'Appointments Today',
        value: '05',
        percent: -14,
    },
    {
        id: 4,
        about: 'Branches',
        value: '15',
        percent: 10,
    },
    {
        id: 5,
        about: 'Completed Consults',
        value: '15',
        percent: 10,
        month: 'this month',
    },
    {
        id: 6,
        about: 'In Progress Consults',
        value: '09',
        percent: -10,
        month: 'this month',
    },
    {
        id: 7,
        about: 'Canceled Consults',
        value: '10',
        percent: -12,
        month: 'this month',
    },
    {
        id: 8,
        about: 'Pending Consults',
        value: '05',
        percent: 10,
        month: 'this month',
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

export const recentActivities = [
    {
        title:'New consultation booked',
        info: 'Patient: Lilian Obasi booked Dr. James Uche',
        time: '11:30am',
        image: image1
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

export const selectField ={
    allStatus:{
        label: 'All Status',
        options: [
            'Closed',
            'In Progress',
            'Open'
        ]
    },
    allRoles:{
        label: 'All Roles',
        options: [
            'Doctor',
            'Patient',
            // 'Open'
        ]
    }
} 

export const supportInfo = {
    updateStatus:{
        title: 'Update Status',
        label: 'Pending',
        options: [
            'Closed',
            'In Progress',
            'Open'
        ]
    },
    priority:{
        title: 'Priority',
        label: 'Low',
        options: [
            'Low',
            'High',
            'Medium'
        ]
    }
}

export const overviewCardData = [
    {
        id: 1,
        about: 'Total Appointments',
        value: '15',
        percent: 12,
    },
    {
        id: 2,
        about: ' Completed Consultations',
        value: '175',
        percent: 12,
    },
    {
        id: 3,
        about: ' Cancelled / No-Show Rate',
        value: '05',
        percent: -14,
    },
    {
        id: 4,
        about: 'Total Hospital Earnings',
        value: '15',
        percent: 10,
    },
    {
        id: 5,
        about: ' Pending Payouts',
        value: '15',
        percent: 10,
        month: 'this month',
    },
    {
        id: 6,
        about: 'Commission Earned',
        value: '09',
        percent: -10,
        month: 'this month',
    },
    {
        id: 7,
        about: 'New Patient',
        value: '10',
        percent: -12,
        month: 'this month',
    },
    {
        id: 8,
        about: 'New Doctors Added ',
        value: '05',
        percent: 10,
        month: 'this month',
    },
]

export const doctorPerformannce = [
    {
        title:'Dr. Sarah Okoro',
        info: '156 consultations',
        time: '11:30am',
        image: image1,
        ratings: '4.8',
        position: '1st',
        earnings: '₦170,000',
        about: 'Total Earnings'
    },
    {
        title:'Dr. Sarah Okoro',
        info: '156 consultations',
        time: '11:30am',
        image: image1,
        ratings: '4.8',
        position: '2nd',
        earnings: '₦170,000',
        about: 'Total Earnings'
    },
    {
        title:'Dr. Sarah Okoro',
        info: '156 consultations',
        time: '11:30am',
        image: image1,
        ratings: '4.8',
        position: '3rd',
        earnings: '₦170,000',
        about: 'Total Earnings'
    },
]

export const hospitalProfile = {
    name:{
        label: 'Hospital Name',
        placeholder: "Ever care Hospital"
    },
    email:{
        title: 'Priority',
        label: 'Work Email',
        placeholder: 'admin@evergreen.com'
    },
    number:{
        title: 'Priority',
        label: 'Phone Number (optional)',
        placeholder: '0907386282'
    },
    language:{
        title: 'Priority',
        label: 'Work Email',
        options: [
            'Low',
            'High',
            'Medium'
        ]
    },
    
}

export const admin = {
    name:{
        label: 'Full Name',
        placeholder: "Ever care Hospital"
    },
    email:{
        title: 'Priority',
        label: 'Email Address',
        placeholder: 'admin@evergreen.com'
    },
    number:{
        title: 'Priority',
        label: 'Phone Number (optional)',
        placeholder: '0907386282'
    },
    role:{
        title: 'Priority',
        label: 'Assign Roles',
        options: [
            'Low',
            'High',
            'Medium'
        ]
    },
    
}

export const role = {
    roleName:{
        label: 'Role Name',
        placeholder: "Ever care Hospital"
    },
    permission:{
        label: 'Permissions',
        options:[
        'Dashboard Access',
        'Manage Doctors (Add/Edit/Deactivate)',
        'Edit Users',
        'Manage Patients',
        'Manage Branches',
        'View Earnings & Transactions',
        'Initiate / Approve Payouts',
        'View Reports & Analytics',
        'View / Respond to Support Tickets'
    ]
    }
}

export const newBranch = {
    branchName:{
        label: 'Branch Name',
        placeholder: "Ever care Hospital"
    },
    branchAddress:{
        title: 'Priority',
        label: 'Branch Address',
        placeholder: 'admin@evergreen.com'
    },
    city:{
        title: 'Priority',
        label: 'State',
        placeholder: 'Lagos'
    },
    number:{
        title: 'Priority',
        label: 'Phone Number (optional)',
        placeholder: '0907386282'
    },
}

export const earningData = [
    {
        id: 1,
        about: 'Earnings this Month',
        value: '₦70,000',
        percent: 12,
    },
    {
        id: 2,
        about: 'Commission Earned ',
        value: '₦170,000',
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
        about: 'Branches',
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

export const appointmentData = [
    {
        id: 1,
        about: 'Total Appointments',
        value: '142',
        percent: 12,
    },
    {
        id: 2,
        about: 'Pending Appointments',
        value: '202',
        percent: 12,
    },
    {
        id: 3,
        about: 'Completed Appointments',
        value: '156',
        percent: -14,
    },
    {
        id: 4,
        about: 'Cancelled Appointments',
        value: '57',
        percent: 10,
    }
]