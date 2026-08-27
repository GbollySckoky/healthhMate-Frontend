"use client"
// import { PageWrapper,} from '@/components/ui/Reusable'
import React from 'react'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import Earnings from './_components/Earnings';
// import Transactions from './_components/Transaction';
// import { FlexWrapper } from '@/lib/components/ui/Reusable';
// import useGetFinance from '@/lib/hooks/useGetFinance';
import { TransactionsPage } from './_components/TransactionTable';

const EarningsPage = () => {
  // const {pagination, financeDatas, isLoading, isError, error, setPagination} = useGetFinance()
  // console.log('FINANCE!!', financeDatas)
  //   console.log('FIN!!', financeDatas.metadata)

  return <TransactionsPage /> 
    // <PageWrapper>
    //   <FlexWrapper>
    //     <Tabs defaultValue="earnings">
    //         <TabsList  className="mb-5">
    //             <TabsTrigger value="earnings">Earnings</TabsTrigger>
    //             <TabsTrigger value="transactions">Transactions</TabsTrigger>
    //         </TabsList>
    //         <TabsContent value="earnings"> <Earnings /> </TabsContent>
    //         <TabsContent value="transactions"> <TransactionsPage />  </TabsContent>
    //     </Tabs>
    //   </FlexWrapper>
    // </PageWrapper>
  // )
}

export default EarningsPage