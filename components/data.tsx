import image1 from '@/assets/Image (1).png' 
import image from '@/assets/Image.png'

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
        time: '11:30am'
    },
    {
        title:'New consultation booked',
        info: 'Patient: Lilian Obasi booked Dr. James Uche',
        time: '11:30am'
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