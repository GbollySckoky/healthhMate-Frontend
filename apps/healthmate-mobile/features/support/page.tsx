'use client';

import { useRouter } from 'next/navigation';
import { PageWrapper } from '@/components/Reusable';
import useGetSupport from '@/hooks/useGetSupport';
// import { SupportTicket } from '@/interface/support';
import TicketCardSkeleton from '@/components/TicketCardSkeleton';
import { SupportTicket } from '@/lib/interface/support';
// import TicketCardSkeleton from '@/lib/components/SupportSkeleton';

const priorityStyles: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  LOW: {
    bg: '#F9FAFB',
    text: '#4B5563',
    border: '#E5E7EB',
  },
  MEDIUM: {
    bg: '#EFF6FF',
    text: '#1D4ED8',
    border: '#BFDBFE',
  },
  HIGH: {
    bg: '#FFF7ED',
    text: '#C2410C',
    border: '#FED7AA',
  },
  URGENT: {
    bg: '#FEF2F2',
    text: '#B91C1C',
    border: '#FECACA',
  },
};

const capitalize = (value?: string) =>
  value
    ? value.charAt(0).toUpperCase() +
      value.slice(1).toLowerCase()
    : '';

const PriorityBadge = ({
  priority,
}: {
  priority: string;
}) => {
  const style =
    priorityStyles[priority] ?? priorityStyles.LOW;

  return (
    <div
      className="rounded-full border px-2 py-[3px]"
      style={{
        backgroundColor: style.bg,
        borderColor: style.border,
      }}
    >
      <p
        className="text-[10px] font-medium"
        style={{ color: style.text }}
      >
        {capitalize(priority)}
      </p>
    </div>
  );
};

const SupportListScreen = () => {
  const router = useRouter();

  const {
    supportData,
    isLoading,
    isError,
    error,
  } = useGetSupport();

  return (
    <PageWrapper>
      {isLoading ? (
        <div className="space-y-3 pt-4 pb-6">
          {[1, 2, 3, 4, 5].map((item) => (
            <TicketCardSkeleton key={item} />
          ))}
        </div>
      ) : isError ? (
        <div className="flex items-center justify-center pt-16">
          <p className="text-[13px] text-lightRed">
            {error?.message ??
              'Failed to load support tickets'}
          </p>
        </div>
      ) : supportData.length === 0 ? (
        <div className="flex items-center justify-center pt-16">
          <p className="text-[13px] text-gray-400">
            No recent support ticket found
          </p>
        </div>
      ) : (
        <div className="space-y-3 pt-4 pb-6">
          {supportData.map((item: SupportTicket) => (
            <div
              key={item.id}
              onClick={() =>
                router.push(`/support/${item.id}`)
              }
              className="cursor-pointer rounded-[10px] border border-borderColor p-[14px] transition-shadow hover:shadow-sm"
            >
              {/* Header */}
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[11px] text-gray-400">
                  {item.ticketNumber}
                </p>

                <PriorityBadge
                  priority={item.priority}
                />
              </div>

              {/* Subject */}
              <h3 className="mb-1 font-lato text-[15px] font-semibold text-black">
                {item.subject}
              </h3>

              {/* Description */}
              <p className="mb-[10px] line-clamp-2 text-[13px] leading-[18px] text-gray-500">
                {item.description}
              </p>

              {/* Footer */}
              <div className="flex flex-wrap items-center text-[11px] text-gray-400">
                <span>
                  {capitalize(item.category)}
                </span>

                <span className="mx-[6px] h-[3px] w-[3px] rounded-full bg-gray-300" />

                <span>
                  {capitalize(item.creatorType)}
                </span>

                <span className="mx-[6px] h-[3px] w-[3px] rounded-full bg-gray-300" />

                <span>
                  Appt #{item.appointmentId}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </PageWrapper>
  );
};

export default SupportListScreen;