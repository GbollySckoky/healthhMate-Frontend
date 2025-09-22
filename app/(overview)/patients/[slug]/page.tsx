import { PageWrapper,} from '@/components/reusable/Reusable'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


const Page = () => {
  return (
    <PageWrapper>
        <Tabs defaultValue="overview">
        <TabsList  className="mb-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">  </TabsContent>
        <TabsContent value="appointments">  </TabsContent>
    </Tabs>
    </PageWrapper>
  )
}

export default Page