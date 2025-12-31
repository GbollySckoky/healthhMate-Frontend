"use client"
import { PageWrapper,} from '@/components/ui/Reusable'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Earnings from './_components/Earnings';
import { TransactionsPage } from './_components/Transactions';
import { useQuery } from '@tanstack/react-query';
import { Doctor } from '@/lib/constant/service';



const EarningsPage = () => {
  const {data, isLoading, error, isError} = useQuery({
    queryKey: ['getPayout'],
    queryFn: () => Doctor.getPayout()
  })

  console.log(data)
  return (
    <PageWrapper>
         <Tabs defaultValue="earnings">
            <TabsList  className="mb-5">
                <TabsTrigger value="earnings">Earnings</TabsTrigger>
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
            </TabsList>
            <TabsContent value="earnings"> <Earnings /> </TabsContent>
            <TabsContent value="transactions"> <TransactionsPage />  </TabsContent>
        </Tabs>
    </PageWrapper>
  )
}

export default EarningsPage