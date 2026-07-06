import { Infos } from '@/components/ui/Reusable'
import React from 'react'
import { Appointment } from '@/interface/doctor-apppointment.interface'
import DetailSkeleton from '@/components/ui/DetailsSkeleton'


const Overview = ({appointmentDetails, isLoading}:{appointmentDetails: Appointment, isLoading: boolean}) => {

  //   if (isLoading) {
  //   return <DetailSkeleton />;
  // }
  return (
    <div>
      {isLoading ? (
         <DetailSkeleton />
      ) : (
        <div className="space-y-4">
          <div className=' border border-borderColor p-4 rounded-lg space-y-2'>
              <Infos label='Consultation Date' value={appointmentDetails?.date}/>
              <Infos label='Consultation Time' value={appointmentDetails?.time}/>
              <Infos label='Consultation Type' value={appointmentDetails?.consultationType}/>
              <Infos label='Primary Health Concern' value={appointmentDetails?.healthConcern}/>
              <Infos label='Consultation Fee' value={appointmentDetails?.amount}/>
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