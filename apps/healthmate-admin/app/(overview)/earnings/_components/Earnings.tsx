import { Card, MediumText, Value } from '@/components/ui/Reusable';
import React from 'react'
import useGetEarningStats from '@/lib/hooks/useGetEarningStats';
const EarningsPage = () => {
    const {
        earningStats,
        isLoading,
    } = useGetEarningStats();
      console.log(earningStats)
      const earningData = [
    {
      id: 2,
      about: 'Cancelled Earnings',
      value: earningStats?.cancelled,
    },
    {
      id: 1,
      about: 'Failed Earnings',
      value: earningStats?.failed,
    },
    {
      id: 3,
      about: 'Pending Earnings',
      value: earningStats?.pending,
    },
    {
      id: 4,
      about: 'Processing Earnings',
      value: earningStats?.processing,
    },
    {
      id: 5,
      about: 'Refunded Earnings',
      value: earningStats?.refunded,
    },
    {
      id: 6,
      about: 'Successful Earnings',
      value: earningStats?.successful,
    },
    {
      id: 7,
      about: 'Total',
      value: `${Number(
        earningStats?.total ?? 0
      ).toLocaleString()}`,
    },
    {
      id: 8,
      about: 'Total Earnings',
      value: `₦${Number(
        earningStats?.successfulAmount ?? 0
      ).toLocaleString()}`,
    },
  ];

  const skeletonData = Array.from({ length: 8 });
  return (
    <div>
        <Card className='grid grid-cols-4 gap-4'>
            {isLoading
            ? skeletonData.map((_, index) => (
                <Card key={index}>
                    {/* Label skeleton */}
                    <div className="h-4 w-32 rounded bg-gray-200 animate-pulse" />

                    <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-2">
                        {/* Value skeleton */}
                        <div className="h-7 w-24 rounded bg-gray-200 animate-pulse" />
                    </div>
                    </div>
                </Card>
            ))
            : earningData.map((earning) => {
                const {id,  value, about} = earning;
                return(
                    <Card key={id}>
                        <MediumText> {about} </MediumText>
                        <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center space-x-2">
                                <Value>{value}</Value>
                            </div>
                        </div>
                    </Card>
                )
            })}
        </Card>
        {/* <EarningsTable /> */}
    </div>
  )
}

export default EarningsPage