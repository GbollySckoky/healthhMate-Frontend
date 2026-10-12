"use client"
import {  FlexWrapper, PageWrapper } from '@/lib/components/ui/Reusable'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/lib/components/ui/tabs"
import EditProfile from './EditProfile'
import ChangePassword from './ChangePassword'


const SettingsPage = () => {

  return (
    <PageWrapper>
      <FlexWrapper>
         <Tabs defaultValue="change-password" className='bg-white mt-4'>
            <TabsList className='mb-5'>
                <TabsTrigger value="change-password">Change Password</TabsTrigger>
                <TabsTrigger value="profile">Update Profile</TabsTrigger>
            </TabsList>
            <TabsContent value="change-password"><ChangePassword /> </TabsContent>
            <TabsContent value="profile"> <EditProfile /> </TabsContent>
        </Tabs>
    </FlexWrapper>
    </PageWrapper>
  )
}

export default SettingsPage
