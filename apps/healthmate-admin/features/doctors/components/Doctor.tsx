import { PageWrapper } from '@/components/ui/Primitives'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import All from '@/features/doctors/components/All'
import Approved from '@/features/doctors/components/Approved'
import Pending from '@/features/doctors/components/Pending'
import { FlexWrapper } from '@/components/ui/DetailPrimitives'
const Doctor = () => {
  return (
    <PageWrapper>
      <FlexWrapper>
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
      </FlexWrapper>
    </PageWrapper>
  )
}

export default Doctor