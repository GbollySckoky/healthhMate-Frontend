import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageWrapper } from '@/components/ui/Reusable'
import { Roles } from './Roles'
import { AdminAccount } from './AdminAccount'
import HospitalProfile from './HospitalProfile'

const Settings = () => {
  return (
    <PageWrapper>
        <Tabs defaultValue="general">
            <TabsList  className="mb-5">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="roles">Roles and Permission</TabsTrigger>
                <TabsTrigger value="account">Admin Account</TabsTrigger>
            </TabsList>
            <TabsContent value="general"> <HospitalProfile /> </TabsContent>
            <TabsContent value="roles"><Roles /> </TabsContent>
            <TabsContent value="account"><AdminAccount /> </TabsContent>
        </Tabs>
    </PageWrapper>
  )
}

export default Settings