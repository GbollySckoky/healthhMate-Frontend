"use client"
import { Card, DisplayFlex } from "@/components/ui/Reusable"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { ChevronRight } from "lucide-react"
import { Doctor } from '@/lib/constant/service';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/routes';
import Link from "next/link"
import { Appointment } from "@/interface/doctor-apppointment.interface";
import { STATUS } from "@/types/status";
import { RecentConsultationTableSkeleton } from "@/components/ui/DashboardSkeleton";

  
  export function RecentConsultation() {
    const router = useRouter()
    const getStatusStyle = (status: string) => {
        switch (status) {
            case STATUS.COMPLETED:
                return 'text-green-700 bg-green-100'
            case STATUS.PENDING:
                return 'text-gray-700 bg-gray-100'
            case STATUS.CANCELLED:
                return 'text-red-700 bg-red-100'
            default:
                return ''
        }
    }
    const {data, isLoading, error, isError} = useQuery({
      queryKey: ['getAppointment'],
      queryFn: () => Doctor.getAppointment()
    })

    const recentConsultation = data?.data ?? []
    const completedConsultation = recentConsultation?.filter((consult: Appointment) => consult.status === STATUS.PENDING || consult.status === STATUS.CANCELLED || consult.status === STATUS.REJECTED)

    return (
        <Card>
            <DisplayFlex>
                <p className="font-lato font-medium text-[18px] text-30">Recent Consultation</p>
                <div className="flex items-center text-red-800 cursor-pointer hover:text-red-600">
                    <Link className='font-semibold text-[15px]' href={ROUTES.patients}>See all</Link>
                    <ChevronRight size={18} />
                </div>
            </DisplayFlex> 
            <Table className="mt-5 ">
                <TableHeader className="border-t border-borderColor text-grey-20">
                    <TableRow className="bg-[#FAFBFF] font-inter text-[12px] font-medium ">
                        <TableHead >Name</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {isLoading ? (
                  <RecentConsultationTableSkeleton />
                ) : isError ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      {error.message}
                    </TableCell>
                  </TableRow>
                ): completedConsultation.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      No recent consultation found
                    </TableCell>
                  </TableRow>
                ) : completedConsultation?.slice(0, 10)?.map((consult: Appointment) => (
                    <TableRow  key={consult.id}>
                    <TableCell className="font-inter font-medium text-[13px] text-grey-30">
                        {consult.user.firstName || "N/A"} {" "} {consult.user.lastName || "N/A"}
                        <p className="text-grey-20 text-[12px] font-normal">{consult.user.email || "N/A"}</p>
                    </TableCell>
                    <TableCell className="font-inter font-normal text-[13px] text-grey-30">
                        <p>{consult.date}</p> 	
                        <p className="text-grey-20 text-[12px]">{consult.time}</p>
                    </TableCell>
                    <TableCell className="font-inter font-normal text-[12px] text-grey-20">{consult.consultationType}</TableCell>
                    <TableCell>
                        <span className={`font-inter font-medium rounded-full text-[12px] w-fit py-1 px-3 ${getStatusStyle(consult.status)}`}>
                            {consult.status}
                        </span>
                    </TableCell>
                    <TableCell className="font-inter font-normal text-[14px] text-red-800">
                      <button
                        onClick={() => router.push(`${ROUTES.patients}/${consult.id}`)}>
                          View Details
                        </button> 
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
      </Card>
    )
  }
  