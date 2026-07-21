import { Infos } from '@/lib/components/ui/Reusable'
import React from 'react'
import { Appointment } from '@/lib/interface/doctor-apppointment.interface'
import DetailSkeleton from '@/lib/components/ui/DetailsSkeleton'


const Overview = ({appointmentDetails, isLoading}:{appointmentDetails: Appointment, isLoading: boolean}) => {

  return (
    <div>
      {isLoading ? (
         <DetailSkeleton />
      ) : (
        <div>
          <div className=' border border-borderColor p-4 rounded-lg space-y-2'>
              <Infos label='Consultation Date' value={appointmentDetails?.date}/>
              <Infos label='Consultation Time' value={appointmentDetails?.time}/>
              <Infos label='Consultation Type' value={appointmentDetails?.consultationType.charAt(0).toUpperCase() + appointmentDetails?.consultationType.slice(1).replaceAll("_", " ")}/>
              <Infos label='Primary Health Concern' value={appointmentDetails?.healthConcern}/>
              <Infos label='Consultation Fee' value={appointmentDetails?.amount.toLocaleString()}/>
          </div>
          <div className=' border border-borderColor p-4 rounded-lg space-y-2'>
              <Infos label='Patient Name' value={appointmentDetails?.user?.firstName + ' ' + appointmentDetails?.user?.lastName || '-'}/>
              <Infos label='Patient Email' value={appointmentDetails?.user?.email || '-'}/>
              <Infos label='Doctor Name' value={`${appointmentDetails?.doctor?.firstName} ${appointmentDetails?.doctor?.lastName}`}/>
              <Infos label='Doctor Email' value={appointmentDetails?.doctor?.email || '-'}/>
          </div>
          <div className=' border border-borderColor p-4 rounded-lg space-y-2'>
            <Infos label='Hospital Name' value={appointmentDetails?.hospital?.hospitalName || '-'}/>
            <Infos label='Hospital Email' value={appointmentDetails?.hospital?.email || '-'}/>
          </div>
      </div>
      )}
    </div>
  )
}

export default Overview