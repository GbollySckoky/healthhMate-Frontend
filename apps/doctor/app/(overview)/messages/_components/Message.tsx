import { Card, PageWrapper } from '@/components/ui/Reusable'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import All from './All'
import Closed from './Closed'
import Active from './Active'


const Message = () => {
  return (
    <PageWrapper>
        <Card>
        <p className='text-[16px] font-semibold font-libre text-grey-900 mb-2'>All Messages</p>
            <Tabs defaultValue="all" className='w-full'>
                <TabsList  className="mb-5 w-full">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="active"> Active </TabsTrigger>
                    <TabsTrigger value="closed"> Closed </TabsTrigger>
                </TabsList>
                <TabsContent value="all"><All />  </TabsContent>
                <TabsContent value="active"> <Active />  </TabsContent>
                <TabsContent value="closed"> <Closed /> </TabsContent>
            </Tabs>
        </Card>
    </PageWrapper>
  )
}

export default Message