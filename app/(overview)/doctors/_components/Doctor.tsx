import { PageWrapper } from '@/components/ui/Reusable'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import All from './All'
import Approved from './Approved'
import Pending from './Pending'
const Doctor = () => {
  return (
    <PageWrapper>
          <Tabs defaultValue="all">
                <TabsList  className='mb-5'>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="approved">Approved</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                </TabsList>
                <TabsContent value="all"> <All /> </TabsContent>
                <TabsContent value="approved"> <Approved />  </TabsContent>
                <TabsContent value="pending"> <Pending /> </TabsContent>
            </Tabs>
    </PageWrapper>
  )
}

export default Doctor