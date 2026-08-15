"use client"

import { ROUTES } from '@/constants/route'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

const PAGE_META: Record<
  string,
  {
    title: string
    description: string
  }
> = {
  [ROUTES.sleep]: {
    title: 'Sleep Log',
    description: 'Monitor your rest and improve your sleep routine',
  },
  [ROUTES.bloodPressure]: {
    title: 'Blood Pressure Tracker',
    description: 'Track your readings to monitor your heart health',
  },
  [ROUTES.mood]: {
    title: 'How Are You Feeling Today?',
    description:
      'Tracking your mood helps you understand your emotional health',
  },
  [ROUTES.weight]: {
    title: 'Track Your Weight',
    description:
      'Tracking your weight helps you monitor your overall health',
  },
  [ROUTES.medication]: {
    title: 'Medication Log',
    description:
      'Tracking your meds ensures better treatment outcomes',
  },
}

const ROUTE_TITLES: Record<string, string> = {
  [ROUTES.home]: 'Home',
  [ROUTES.track]: 'Track',
  [ROUTES.appointments]: 'Appointments',
  [ROUTES.consultation]: 'Consultations',
  [ROUTES.profile]: 'Profile',
  [ROUTES.support]: 'Support',
  [ROUTES.settings]: 'Settings',
  [ROUTES.notifications]: 'Notifications',
}

export const usePageTitle = (): ReactNode => {
  const pathname = usePathname()

  // Pages with title + description
  const page = PAGE_META[pathname]

  if (page) {
    return (
      <>
        <h1>{page.title}</h1>
        <p className="font-libre text-xs font-normal text-[#717680]">
          {page.description}
        </p>
      </>
    )
  }

  // Consultation details
  if (pathname.startsWith(`${ROUTES.consultation}/`)) {
    return 'Consultation Details'
  }

  // Appointment details
  if (pathname.startsWith(`${ROUTES.appointments}/`)) {
    return 'Appointment Details'
  }

  // Support details
  if (pathname.startsWith(`${ROUTES.support}/`)) {
    return 'Support Details'
  }

  return ROUTE_TITLES[pathname] ?? ''
}