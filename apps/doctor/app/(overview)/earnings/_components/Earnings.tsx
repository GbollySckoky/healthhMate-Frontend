// import { earningData } from '@/components/ui/data';
import { Card, MediumText, Value } from '@/lib/components/ui/Reusable';
import React from 'react'
import { ArrowDown, ArrowUp } from "lucide-react"
import { EarningsTable } from './EarningsTable';
// import { Doctor } from '@/lib/constant/service';
// import { useQuery } from '@tanstack/react-query';
// import { EarningSummary } from '@/lib/interface/get-earnings-summary';
// import LoadingSpinner from '@/components/ui/LoadingSpinner';


const EarningsPage = () => {
    // const {data, isLoading, error, isError} = useQuery({
    //     queryKey: ['getEarnings'],
    //     queryFn: () => Doctor.getEarnings()
    //   })

    // const datas = data as EarningSummary

   const earningData = [
        {
            id: 2,
            about: 'Total Earnings',
            value: `400,000`,
            percent: 12,
        },
        {
            id: 1,
            about: 'Earnings this Month',
            value: `200,000`,
            percent: 12,
        },
        {
            id: 3,
            about: 'Pending Payouts',
            value: `100,000`,
            percent: -14,
        },
        {
            id: 4,
            about: 'Completed Payouts',
            value: `300,000`,
            percent: 10,
        }
    ]

  return (
    <div>
        {/* {isLoading ? (
            <LoadingSpinner />
        ): ( */}
        <Card className='flex items-center gap-4'>
            {earningData.map((earning) => {
                const {id,  value,percent, about} = earning;
                return(
                    <Card key={id}>
                        <MediumText> {about} </MediumText>
                        <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center space-x-2">
                                <Value>{value}</Value>
                            </div>
                            <div className={`flex items-center ${percent > 0 ? 'text-[#05A505]' :'text-[#F04438]'}`}>
                                {percent > 0 ? <ArrowUp size={15}  /> : <ArrowDown size={15} />}
                                <p>{percent}%</p>
                            </div>
                            
                        </div>
                    </Card>
                )
            })}
        </Card>
        {/* )} */}
        <EarningsTable />
    </div>
  )
}

export default EarningsPage