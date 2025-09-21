import { PageWrapper,} from '@/components/reusable/Reusable'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Earnings from './_components/Earnings';
import TransactionsPage from './_components/Transaction';

const EarningsPage = () => {
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