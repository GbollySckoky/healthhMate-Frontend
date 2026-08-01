"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Bell, Calendar, MessageSquare, CheckCircle2 } from "lucide-react"

import useGetUnReadNotification from "@/hooks/useGetUnReadNotification"
import useGetNotification from "@/hooks/useGetNotification"
import { patientService } from "@/service/patientService"
// import { Wrapper } from "@/components/PatientUIComponents"
import { Notification } from "@/lib/interface/notification"
import { PageWrapper } from "@/components/Reusable"

const typeConfig: Record<
  string,
  { icon: React.ElementType; color: string; bg: string }
> = {
  SUPPORT_TICKET_CREATED: { icon: MessageSquare, color: "#2563eb", bg: "#eff6ff" },
  SUPPORT_TICKET_RESOLVED: { icon: CheckCircle2, color: "#16a34a", bg: "#f0fdf4" },
  APPOINTMENT: { icon: Calendar, color: "#9333ea", bg: "#faf5ff" },
  DEFAULT: { icon: Bell, color: "#6b7280", bg: "#f3f4f6" },
}

function getRelativeTime(dateString: string) {
  const diffMs = Date.now() - new Date(dateString).getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return "Just now"
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return new Date(dateString).toLocaleDateString()
}

function NotificationSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="flex flex-row gap-3 p-4 border border-[#f3f4f6] rounded-xl"
        >
          <div className="w-9 h-9 rounded-full bg-[#f3f4f6]" />
          <div className="flex-1 flex flex-col gap-1.5">
            <div className="h-2.5 w-[30%] bg-[#f3f4f6] rounded" />
            <div className="h-2.5 w-[70%] bg-[#f3f4f6] rounded" />
          </div>
        </div>
      ))}
    </div>
  )
}

const NotificationScreen = () => {
  const { notifications, isLoading, isError, error, isRefetching } =
    useGetNotification()
  const { unReadNotifications } = useGetUnReadNotification()

  const router = useRouter()
  const queryClient = useQueryClient()

  const markAsReadMutation = useMutation({
    mutationFn: (id: string) => patientService.markNotificationAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getNotifications"] })
    },
  })

  const markAllAsReadMutation = useMutation({
    mutationFn: () => patientService.markAllNotificationAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getNotifications"] })
    },
  })

  const handleNotificationPress = (notification: Notification) => {
    if (!notification.isRead) {
      markAsReadMutation.mutate(notification.id)
    }
    if (notification.supportTicketId) {
      router.push(`/support-tickets/${notification.supportTicketId}`)
    } else if (notification.appointmentId) {
      router.push(`/appointments/${notification.appointmentId}`)
    }
  }

  const renderItem = (item: Notification) => {
    const config = typeConfig[item.type] ?? typeConfig.DEFAULT
    const Icon = config.icon

    return (
      <button
        key={item.id}
        type="button"
        onClick={() => handleNotificationPress(item)}
        className={`w-full text-left flex flex-row gap-3 p-3.5 rounded-xl border transition active:opacity-70 ${
          item.isRead
            ? "border-[#f3f4f6] bg-white"
            : "border-[#dbeafe] bg-[#eff6ff66]"
        }`}
      >
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: config.bg }}
        >
          <Icon size={16} color={config.color} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-row items-center justify-between gap-2">
            <span className="flex-1 min-w-0 truncate text-sm font-semibold text-[#111827]">
              {item.title}
            </span>
            <span className="text-[11px] text-[#9ca3af] whitespace-nowrap">
              {getRelativeTime(item.createdAt)}
            </span>
          </div>
          <p className="text-[13px] text-[#6b7280] mt-0.5 line-clamp-2">
            {item.body}
          </p>
        </div>

        {!item.isRead && (
          <div className="w-2 h-2 rounded-full bg-[#3b82f6] mt-1.5 shrink-0" />
        )}
      </button>
    )
  }

  if (isLoading) {
    return (
      <div className="flex-1 px-4 pt-4 bg-white">
        <PageWrapper>
          <h1 className="text-lg font-semibold mb-4">Notifications</h1>
          <NotificationSkeleton />
        </PageWrapper>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-2">
        <p className="text-[13px] text-[#6b7280] text-center">
          {(error as Error)?.message ?? "Failed to load notifications"}
        </p>
      </div>
    )
  }

  return (
    <div className="flex-1 px-4 pt-4 bg-white min-h-screen">
      <h1 className="text-lg font-semibold mb-4">Notifications</h1>

      {isRefetching && (
        <p className="text-xs text-[#9ca3af] mb-2">Refreshing…</p>
      )}

      {unReadNotifications > 0 && (
        <div className="flex flex-row items-center justify-between mb-4">
          <span className="text-xs text-[#9ca3af]">
            {unReadNotifications} unread notification
            {unReadNotifications > 1 ? "s" : ""}
          </span>
          <button
            type="button"
            onClick={() => markAllAsReadMutation.mutate()}
            className="text-xs text-[#991b1b] underline"
          >
            Mark all as read
          </button>
        </div>
      )}

      <div className="flex flex-col gap-2 pb-6">
        {(notifications ?? []).length > 0 ? (
          (notifications ?? []).map((item: Notification) => renderItem(item))
        ) : (
          <div className="flex flex-col items-center justify-center py-16 gap-2">
            <Bell size={28} color="#d1d5db" />
            <p className="text-[13px] text-[#9ca3af]">No notifications yet</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default NotificationScreen