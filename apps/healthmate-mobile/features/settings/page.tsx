"use client"
import React, { useCallback } from 'react';
import useToggle from '@/hooks/useToggle';
import { useRouter } from 'next/navigation';
import { Card, PageWrapper } from '@/components/Reusable';
import { settingsData } from '@/constants/data';

const SettingsPage = () => {
  const router = useRouter();
  const { isToggle, handleToggle } = useToggle();

  const handlePress = useCallback(
    (url: string) => {
      router.push(url);
    },
    [router]
  );

  return (
    <PageWrapper>
      {/* Account Settings */}
      <div>
        <p className="mb-2.5 font-lato text-sm font-normal text-lightBlack">
          Account Settings
        </p>

        <Card>
          {settingsData.slice(0, 2).map((setting, index) => {
            const { icon, title, url, rightIcon } = setting;
            const isLastItem = index === settingsData.slice(0, 2).length - 1;

            return (
              <div key={setting.id} className="py-[15px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {icon}
                    <p className="ml-[7px] font-lato font-medium text-sm ">
                      {title}
                    </p>
                  </div>

                  {url && (
                    <button onClick={() => handlePress(url)}>
                      {rightIcon}
                    </button>
                  )}
                </div>

                {!isLastItem && (
                  <div className="mt-4 h-px bg-lightGray" />
                )}
              </div>
            );
          })}
        </Card>
      </div>

      {/* Notifications */}
      <div className="mt-[25px]">
        <p className="mb-2.5 font-lato text-sm font-normal text-lightBlack">
          Notifications
        </p>

        <Card>
          {settingsData.slice(2, 4).map((setting, index) => {
            const { icon, title, id, toggleOn, toggleOff } = setting;
            const isLastItem = index === settingsData.slice(2, 4).length - 1;

            return (
              <div key={id} className="py-[15px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {icon}
                    <p className="ml-[7px] font-lato font-medium text-sm ">
                      {title}
                    </p>
                  </div>

                  <button onClick={() => handleToggle(id)}>
                    {isToggle === id ? toggleOn : toggleOff}
                  </button>
                </div>

                {!isLastItem && (
                  <div className="mt-4 h-px bg-lightGray" />
                )}
              </div>
            );
          })}
        </Card>
      </div>

      {/* Help & Support */}
      <div className="mt-[25px]">
        <p className="mb-2.5 font-lato text-sm font-normal text-lightBlack">
          Help &amp; Support
        </p>

        <Card>
          {settingsData.slice(4, 6).map((setting, index) => {
            const { icon, title, id, rightIcon } = setting;
            const isLastItem = index === settingsData.slice(4, 6).length - 1;

            return (
              <div key={id} className="py-[15px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {icon}
                    <p className="ml-[7px] font-lato font-medium text-sm">
                      {title}
                    </p>
                  </div>

                  {rightIcon}
                </div>

                {!isLastItem && (
                  <div className="mt-4 h-px bg-lightGray" />
                )}
              </div>
            );
          })}
        </Card>
      </div>
    </PageWrapper>
  );
};

export default SettingsPage;