"use client"
import {  FlexWrapper, PageWrapper } from '@/components/ui/Primitives'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import EditProfile from '@/features/settings/components/EditProfile'
import ChangePassword from '@/features/settings/components/ChangePassword'
import UploadDocument from '@/features/settings/components/UploadDocument'


const SettingsPage = () => {

  return (
    <PageWrapper>
      <FlexWrapper>
         <Tabs defaultValue="change-password" className='bg-white mt-4'>
            <TabsList className='mb-5'>
                <TabsTrigger value="change-password">Change Password</TabsTrigger>
                <TabsTrigger value="profile">Update Profile</TabsTrigger>
                <TabsTrigger value="documents">Upload Documents</TabsTrigger>
            </TabsList>
            <TabsContent value="change-password"><ChangePassword /> </TabsContent>
            <TabsContent value="profile"> <EditProfile /> </TabsContent>
            <TabsContent value="documents"><UploadDocument /></TabsContent>
        </Tabs>
    </FlexWrapper>
    </PageWrapper>
  )
}

export default SettingsPage
