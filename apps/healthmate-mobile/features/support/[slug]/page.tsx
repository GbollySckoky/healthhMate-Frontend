'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { PageWrapper } from '@/components/Reusable';
import { patientService } from '@/service/patientService';
import SupportTicketDetailSkeleton from '@/components/SupportTicketDetailSkeleton';
import { ReplyToTicket, SupportTicketDetail } from '@/lib/interface/support';
import { Paperclip } from 'lucide-react';


type InputValue = {
  message: string;
  attachmentUrl: string;
  attachmentName: string;
};

const URL_REGEX = /^(https?:\/\/)[^\s$.?#].[^\s]*$/i;

const statusStyles: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  OPEN: {
    bg: '#EFF6FF',
    text: '#1D4ED8',
    border: '#BFDBFE',
  },
  IN_PROGRESS: {
    bg: '#FFFBEB',
    text: '#B45309',
    border: '#FDE68A',
  },
  RESOLVED: {
    bg: '#F0FDF4',
    text: '#15803D',
    border: '#BBF7D0',
  },
  CLOSED: {
    bg: '#F3F4F6',
    text: '#4B5563',
    border: '#E5E7EB',
  },
};

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

const Badge = ({
  text,
  styleMap,
}: {
  text: string;
  styleMap: Record<
    string,
    { bg: string; text: string; border: string }
  >;
}) => {
  const style =
    styleMap[text] ?? statusStyles.CLOSED;

  return (
    <div
      className='rounded-full border px-[10px] py-1'
      style={{
        backgroundColor: style.bg,
        borderColor: style.border,
      }}
    >
      <span
        className='text-[11px] font-medium'
        style={{ color: style.text }}
      >
        {text.replace('_', ' ')}
      </span>
    </div>
  );
};

const SupportTicketDetailScreen = () => {
  // const router = useRouter();
  const params = useParams();

  const id = params?.id as string;
  const queryClient = useQueryClient();

  const [inputValue, setInputValue] =
    useState<InputValue>({
      message: '',
      attachmentUrl: '',
      attachmentName: '',
    });

  const [urlTouched, setUrlTouched] =
    useState(false);

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery<{
    data: SupportTicketDetail;
  }>({
    queryKey: ['getSupportDetails', id],
    queryFn: () =>
      patientService.getSupportDetails(id),
    enabled: !!id,
  });

  const replyMutation = useMutation({
    mutationFn: (payload: ReplyToTicket) =>
      patientService.replyToTicket(id, payload),

    onSuccess: () => {
      setInputValue({
        message: '',
        attachmentUrl: '',
        attachmentName: '',
      });

      setUrlTouched(false);

      queryClient.invalidateQueries({
        queryKey: ['getSupportDetails', id],
      });
    },

    onError: (
      err: AxiosError<{ message: string }>
    ) => {
      console.error(
        'Failed to send reply:',
        err.response?.data?.message
      );
    },
  });

  const handleChange = (
    key: keyof InputValue,
    value: string
  ) => {
    setInputValue((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const isUrlValid =
    inputValue.attachmentUrl === ''
      ? false
      : URL_REGEX.test(
          inputValue.attachmentUrl
        );

  const isDisabled =
    Object.values(inputValue).some(
      (value) => value === ''
    ) || !isUrlValid;

  const handleReplySubmit = () => {
    const payload: ReplyToTicket = {
      message: inputValue.message,
      attachmentUrl:
        inputValue.attachmentUrl,
      attachmentName:
        inputValue.attachmentName,
    };

    replyMutation.mutate(payload);
  };

  if (isLoading) {
    return (
      <PageWrapper>
        <SupportTicketDetailSkeleton />
      </PageWrapper>
    );
  }

  if (isError) {
    return (
      <PageWrapper>
        <div className='flex items-center justify-center pt-16'>
          <p className='text-[13px] text-lightRed'>
            {(error as AxiosError<{ message: string }>)
              ?.response?.data?.message ??
              'Failed to load support ticket'}
          </p>
        </div>
      </PageWrapper>
    );
  }

  const ticket = data?.data;

  if (!ticket) return null;

  return (
    <PageWrapper>
      {/* Header */}
      <div className='mt-[10px] flex justify-between'>
        <div className='flex-1'>
          <p className='mb-1 text-xs text-gray-400'>
            {ticket.ticketNumber}
          </p>

          <h1 className='font-lato text-[17px] font-semibold text-black'>
            {ticket.subject}
          </h1>
        </div>
      </div>

      {/* Badges */}
      <div className='mt-3 flex gap-2'>
        <Badge
          text={ticket.status}
          styleMap={statusStyles}
        />

        <Badge
          text={ticket.priority}
          styleMap={priorityStyles}
        />
      </div>

      {/* Meta Info */}
      <div className='mt-[18px] flex justify-between rounded-[10px] border border-gray-100 bg-[#FAFBFF] p-[14px]'>
        <div className='flex-1'>
          <p className='mb-1 text-[11px] text-gray-400'>
            Category
          </p>

          <p className='text-[13px] font-medium text-black'>
            {ticket.category}
          </p>
        </div>

        <div className='flex-1'>
          <p className='mb-1 text-[11px] text-gray-400'>
            Created by
          </p>

          <p className='text-[13px] font-medium text-black'>
            {ticket.creatorType}
          </p>
        </div>

        <div className='flex-1'>
          <p className='mb-1 text-[11px] text-gray-400'>
            Created
          </p>

          <p className='text-[13px] font-medium text-black'>
            {new Date(
              ticket.createdAt
            ).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Description */}
      <div className='mt-6'>
        <p className='mb-[10px] text-xs text-gray-400'>
          Description
        </p>

        <p className='text-sm leading-5 text-gray-700'>
          {ticket.description}
        </p>
      </div>

            {/* Conversation */}
      <div className="mt-6">
        <p className="mb-[10px] text-xs text-gray-400">
          Conversation
        </p>

        {ticket.messages?.length ? (
          <div className="space-y-3">
            {ticket.messages.map((msg: any) => (
              <div
                key={msg.id}
                className="rounded-[10px] border border-gray-100 p-[14px]"
              >
                <div className="mb-2 flex items-center justify-between">
                  <p className="font-lato text-xs font-semibold text-gray-600">
                    {msg.senderType}
                  </p>

                  <p className="text-[11px] text-gray-400">
                    {new Date(msg.createdAt).toLocaleString()}
                  </p>
                </div>

                <p className="text-sm leading-5 text-gray-800">
                  {msg.message}
                </p>

                {msg.attachmentUrl && (
                  <button
                    type="button"
                    onClick={() =>
                      window.open(msg.attachmentUrl, "_blank")
                    }
                    className="mt-2 flex items-center gap-1 text-lightRed hover:underline"
                  >
                    <Paperclip className="h-4 w-4" />

                    <span className="text-xs">
                      {msg.attachmentName ?? "Attachment"}
                    </span>
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[13px] text-gray-400">
            No messages yet.
          </p>
        )}
      </div>

      {/* Reply Form */}
      <div className="mt-6">
        <p className="mb-[10px] text-xs text-gray-400">
          Reply to this ticket
        </p>

        {/* Message */}
        <div className="mt-[14px]">
          <label className="mb-[6px] block text-xs text-gray-500">
            Message
          </label>

          <textarea
            rows={5}
            placeholder="Type your reply..."
            value={inputValue.message}
            onChange={(e) =>
              handleChange("message", e.target.value)
            }
            className="min-h-[90px] w-full rounded-[10px] border border-borderColor p-3 text-sm text-black outline-none transition focus:border-purple"
          />
        </div>

        {/* Attachment URL */}
        <div className="mt-[14px]">
          <label className="mb-[6px] block text-xs text-gray-500">
            Attachment URL
          </label>

          <input
            type="url"
            placeholder="https://example.com/file.pdf"
            value={inputValue.attachmentUrl}
            onBlur={() => setUrlTouched(true)}
            onChange={(e) =>
              handleChange(
                "attachmentUrl",
                e.target.value
              )
            }
            className={`w-full rounded-[10px] border p-3 text-sm outline-none transition ${
              urlTouched &&
              inputValue.attachmentUrl &&
              !isUrlValid
                ? "border-lightRed"
                : "border-borderColor focus:border-purple"
            }`}
          />

          {urlTouched &&
            inputValue.attachmentUrl &&
            !isUrlValid && (
              <p className="mt-1 text-[11px] text-lightRed">
                Enter a valid URL (must start with
                http:// or https://)
              </p>
            )}
        </div>

        {/* Attachment Name */}
        <div className="mt-[14px]">
          <label className="mb-[6px] block text-xs text-gray-500">
            Attachment Name
          </label>

          <input
            type="text"
            placeholder="report.pdf"
            value={inputValue.attachmentName}
            onChange={(e) =>
              handleChange(
                "attachmentName",
                e.target.value
              )
            }
            className="w-full rounded-[10px] border border-borderColor p-3 text-sm outline-none transition focus:border-purple"
          />
        </div>

        <button
          type="button"
          disabled={
            isDisabled || replyMutation.isPending
          }
          onClick={handleReplySubmit}
          className="mt-5 w-full rounded-[10px] bg-purple py-3 font-lato text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {replyMutation.isPending
            ? "Sending..."
            : "Send Reply"}
        </button>
      </div>
    </PageWrapper>
  );
};

export default SupportTicketDetailScreen;
