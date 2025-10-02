import { earningData } from '@/components/ui/data';
import { Card, MediumText, Value } from '@/components/ui/Reusable';
import React from 'react'
import { ArrowDown, ArrowUp } from "lucide-react"
import { EarningsTable } from './EarningsTable';


const EarningsPage = () => {
  return (
    <div>
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
        <EarningsTable />
    </div>
  )
}

export default EarningsPage