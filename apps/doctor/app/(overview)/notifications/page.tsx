'use client'
import React from 'react'
import { FlexWrapper, PageWrapper } from '@/components/ui/Reusable'
import useGetNotification from '@/hooks/useGetNotification'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Doctor } from '@/lib/constant/service'
import {
  Bell,
  Calendar,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'
import useGetUnReadNotification from '@/hooks/useGetUnReadNotification'

type Notification = {
  id: string
  title: string
  body: string
  type: string
  isRead: boolean
  readAt: string | null
  createdAt: string
  supportTicketId: string | null
  appointmentId: string | null
  doctorId: string | null
  hospitalId: string | null
  patientId: string | null
}

const typeConfig: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  SUPPORT_TICKET_CREATED: { icon: MessageSquare, color: 'text-blue-600', bg: 'bg-blue-50' },
  SUPPORT_TICKET_RESOLVED: { icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
  APPOINTMENT: { icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-50' },
  DEFAULT: { icon: Bell, color: 'text-gray-500', bg: 'bg-gray-100' },
}

function getRelativeTime(dateString: string) {
  const diffMs = Date.now() - new Date(dateString).getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return new Date(dateString).toLocaleDateString()
}

function NotificationSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex gap-3 p-4 border border-gray-100 rounded-lg">
          <div className="w-9 h-9 rounded-full bg-gray-100 shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-1/3 bg-gray-100 rounded" />
            <div className="h-3 w-2/3 bg-gray-100 rounded" />
          </div>
        </div>
      ))}
    </div>
  )
}

const Page = () => {
  const { notifications, isLoading, isError, error } = useGetNotification()
  const {unReadNotifications} = useGetUnReadNotification()

  const router = useRouter()
  const queryClient = useQueryClient()

  const markAsReadMutation = useMutation({
    mutationFn: (id: string) => Doctor.markNotificationAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getNotifications'] })
    },
  })

  const markAllAsReadMutation = useMutation({
    mutationFn: () => Doctor.markAllNotificationAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getNotifications'] })
    },
  })

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.isRead) {
      markAsReadMutation.mutate(notification.id)
    }
    if (notification.supportTicketId) {
      router.push(`/support/${notification.supportTicketId}`)
    } else if (notification.appointmentId) {
      router.push(`/appointments/${notification.appointmentId}`)
    }
  }

  return (
    <PageWrapper>
      <FlexWrapper className="flex-col">
        {unReadNotifications > 0 && (
          <div className="flex items-center justify-between mb-6">
            <p className="text-xs text-gray-400 mt-0.5">
              {unReadNotifications} unread notification{unReadNotifications > 1 ? 's' : ''}
            </p>
            <p onClick={() => markAllAsReadMutation.mutate()} className='text-xs underline cursor-pointer text-red-800 hover:text-red-700'>Mark all as read</p>
          </div>
        )}
        {isLoading ? (
          <NotificationSkeleton />
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <AlertCircle size={28} className="text-red-400 mb-2" />
            <p className="text-sm text-grey-500">
              {(error as Error)?.message ?? 'Failed to load notifications'}
            </p>
          </div>
        ) : !notifications || notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Bell size={28} className="text-gray-300 mb-2" />
            <p className="text-sm text-gray-400">No notifications yet</p>
          </div>
        ) : (
          <div className="space-y-2">
            {notifications.map((notification: Notification) => {
              const config = typeConfig[notification.type] ?? typeConfig.DEFAULT
              const Icon = config.icon

              return (
                <button
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`w-full text-left flex gap-3 p-4 rounded-lg border transition ${
                    notification.isRead
                      ? 'border-gray-100 bg-white hover:bg-gray-50'
                      : 'border-blue-100 bg-blue-50/40 hover:bg-blue-50'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${config.bg}`}
                  >
                    <Icon size={16} className={config.color} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {notification.title}
                      </p>
                      <span className="text-xs text-gray-400 shrink-0">
                        {getRelativeTime(notification.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-0.5 line-clamp-2">
                      {notification.body}
                    </p>
                  </div>

                  {!notification.isRead && (
                    <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                  )}
                </button>
              )
            })}
          </div>
        )}
      </FlexWrapper>
    </PageWrapper>
  )
}

export default Page