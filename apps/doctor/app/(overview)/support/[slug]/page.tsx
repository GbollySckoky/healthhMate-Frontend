"use client"
import { Doctor } from '@/lib/constant/service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { ArrowLeft, Paperclip, Send, StickyNote } from 'lucide-react'
import { AxiosError } from 'axios'
import { Message, ReplyToTicket, SupportTicketDetail } from '@/lib/interface/support'
import Link from 'next/link'
import { FlexWrapper, PageWrapper } from '@/lib/components/ui/Reusable'
// import InputField from '@/components/ui/InputField'
import SupportField from '@/lib/components/ui/SupportField'


const statusStyles: Record<string, string> = {
  OPEN: 'bg-blue-50 text-blue-700 border-blue-200',
  IN_PROGRESS: 'bg-amber-50 text-amber-700 border-amber-200',
  RESOLVED: 'bg-green-50 text-green-700 border-green-200',
  CLOSED: 'bg-gray-100 text-gray-600 border-gray-200',
}

const priorityStyles: Record<string, string> = {
  LOW: 'bg-gray-50 text-gray-600 border-gray-200',
  MEDIUM: 'bg-blue-50 text-blue-700 border-blue-200',
  HIGH: 'bg-orange-50 text-orange-700 border-orange-200',
  URGENT: 'bg-red-50 text-red-700 border-red-200',
}

function Badge({ text, styleMap }: { text: string; styleMap: Record<string, string> }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium border ${
        styleMap[text] ?? 'bg-gray-50 text-gray-600 border-gray-200'
      }`}
    >
      {text.replace('_', ' ')}
    </span>
  )
}

function DetailSkeleton() {
  return (
    <PageWrapper>
        <FlexWrapper>
            <div className="max-w-3xl mx-auto p-6 animate-pulse space-y-6">
            <div className="h-4 w-16 bg-gray-200 rounded" />
            <div className="h-6 w-56 bg-gray-200 rounded" />
            <div className="h-24 bg-gray-100 rounded-lg" />
            <div className="h-40 bg-gray-100 rounded-lg" />
            <div className="h-24 bg-gray-100 rounded-lg" />
            </div>
        </FlexWrapper>
    </PageWrapper>
   
  )
}

const Page = () => {
  const params = useParams()
  const router = useRouter()
  const queryClient = useQueryClient()
  const id = String(params?.slug)

//   const [replyMessage, setReplyMessage] = useState('')
  const [message, setNoteMessage] = useState('')
  const [inputValue, setInputValue] = useState({
    message: '',
    attachmentUrl: '',
    attachmentName: '',
  })

  const { data, isLoading, isError, error } = useQuery<{ data: SupportTicketDetail }>({
    queryKey: ['getSupportDetails', id],
    queryFn: () => Doctor.getSupportDetails(id),
    enabled: !!id,
  })

  const isDisabled = Object.values(inputValue).some((v) => v === '')

  const replyMutation = useMutation({
    mutationFn: (payload: ReplyToTicket) => Doctor.replyToTicket(id, payload),
    onSuccess: (response) => {
        console.log(response)
      queryClient.invalidateQueries({ queryKey: ['getSupportDetails', id] })
    },
    onError: (err: AxiosError<{ message: string }>) => {
      console.error('Failed to send reply:', err.response?.data?.message)
    },
  })

  const noteMutation = useMutation({
    mutationFn: (message: Message) => Doctor.addInternalNote(id, message ),
    onSuccess: () => {
      setNoteMessage('')
      queryClient.invalidateQueries({ queryKey: ['getSupportDetails', id] })
    },
    onError: (err: AxiosError<{ message: string }>) => {
      console.error('Failed to add internal note:', err.response?.data?.message)
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setInputValue((prev) => ({
        ...prev,
        [name]: value
    }))
  }

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // if (!replyMessage.trim()) return
    const payload = {
        message: inputValue.message,
        attachmentUrl: inputValue.attachmentUrl,
        attachmentName: inputValue.attachmentName
    }
    replyMutation.mutate(payload)
  }

  const handleNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return
    const data = {
        message: message
    }
    noteMutation.mutate(data)
  }

  if (isLoading) return <DetailSkeleton />

  if (isError) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6"
        >
          <ArrowLeft size={16} /> Back
        </button>
        <div className="text-center py-12 text-grey-500 text-sm">
          {(error as AxiosError<{ message: string }>)?.response?.data?.message ??
            'Failed to load support ticket'}
        </div>
      </div>
    )
  }

  const ticket = data?.data
  if (!ticket) return null

  return (
    <PageWrapper>
        <FlexWrapper>
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
            <div>
            <p className="text-xs text-gray-400 mb-1">{ticket.ticketNumber}</p>
            <h1 className="text-lg font-semibold text-gray-900">{ticket.subject}</h1>
            </div>
            <div className="flex gap-2">
            <Badge text={ticket.status} styleMap={statusStyles} />
            <Badge text={ticket.priority} styleMap={priorityStyles} />
            </div>
        </div>

        {/* Meta info */}
        <div className="grid grid-cols-3 gap-4 text-sm bg-[#FAFBFF] border border-gray-100 rounded-lg p-4 mb-6">
            <div>
            <p className="text-gray-400 text-xs mb-1">Category</p>
            <p className="text-gray-800 font-medium">{ticket.category}</p>
            </div>
            <div>
            <p className="text-gray-400 text-xs mb-1">Created by</p>
            <p className="text-gray-800 font-medium">{ticket.creatorType}</p>
            </div>
            <div>
            <p className="text-gray-400 text-xs mb-1">Created</p>
            <p className="text-gray-800 font-medium">
                {new Date(ticket.createdAt).toLocaleString()}
            </p>
            </div>
        </div>

        {/* Description */}
        <div className="mb-8">
            <p className="text-xs text-gray-400 mb-2">Description</p>
            <p className="text-sm text-gray-700 leading-relaxed">{ticket.description}</p>
        </div>

        {/* Conversation */}
        <div className="mb-8">
            <p className="text-xs text-gray-400 mb-3">Conversation</p>
            <div className="space-y-4">
            {ticket.messages?.length ? (
                ticket.messages.map((msg) => (
                <div key={msg.id} className="border border-gray-100 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-600">{msg.senderType}</span>
                    <span className="text-xs text-gray-400">
                        {new Date(msg.createdAt).toLocaleString()}
                    </span>
                    </div>
                    <p className="text-sm text-gray-800">{msg.message}</p>
                    {msg.attachmentUrl && (
                    <Link
                        href={msg.attachmentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1 text-xs text-blue-600 hover:underline"
                    >
                        <Paperclip size={12} />
                        {msg.attachmentName ?? 'Attachment'}
                    </Link>
                    )}
                </div>
                ))
            ) : (
                <p className="text-sm text-gray-400">No messages yet.</p>
            )}
            </div>
        </div>

        {/* Reply form */}
        <div className="mb-8">
            <p className="text-xs text-gray-400 mb-3">Reply to this ticket</p>
            <form onSubmit={handleReplySubmit} className="flex flex-col gap-2">
            <div>
                <label htmlFor="message" className='text-xs text-gray-400 font-inter'>Message</label>
                <textarea
                    value={inputValue.message}
                    onChange={handleChange}
                    placeholder="Type your reply..."
                    rows={3}
                    className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-red-300"
                    name='message'
                    id='message'
                />
            </div>
            <SupportField
                label="Attachment Url"
                value={inputValue.attachmentUrl}
                onChange={handleChange}
                placeholder="https://example.com/file.pdf"
                type="url"
                name="attachmentUrl"
            />
            <SupportField 
                label="Attachment Name"
                value={inputValue.attachmentName}
                onChange={handleChange}
                placeholder="report.pdf"
                type="text"
                name="attachmentName"
            />
            <button
                type="submit"
                disabled={replyMutation.isPending || isDisabled}
                className="self-end flex items-center gap-1.5 bg-red-800 text-white text-sm font-medium px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-900 transition"
            >
                <Send size={14} />
                {replyMutation.isPending ? 'Sending...' : 'Send reply'}
            </button>
            </form>
        </div>

        {/* Internal notes */}
        <div className="mb-8">
            <p className="text-xs text-gray-400 mb-3">Internal notes (staff-only)</p>
            <div className="space-y-3 mb-3">
            {ticket.internalNotes?.length ? (
                ticket.internalNotes.map((note) => (
                <div key={note.id} className="bg-red-100 rounded-lg p-3">
                    <p className="text-sm text-gray-800">{note.message}</p>
                    <p className="text-xs text-gray-400 mt-1">
                    {new Date(note.createdAt).toLocaleString()}
                    </p>
                </div>
                ))
            ) : (
                <p className="text-sm text-gray-400">No internal notes yet.</p>
            )}
            </div>
            <form onSubmit={handleNoteSubmit} className="flex flex-col gap-2">
            <textarea
                value={message}
                onChange={(e) => setNoteMessage(e.target.value)}
                placeholder="Note visible only to hospital/doctor staff..."
                rows={2}
                className="w-full border border-border rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-red-300"
            />
            <button
                type="submit"
                disabled={noteMutation.isPending || !message.trim()}
                className="self-end flex items-center gap-1.5 bg-red-800 text-white text-sm font-medium px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-800 transition"
            >
                <StickyNote size={14} />
                {noteMutation.isPending ? 'Saving...' : 'Add note'}
            </button>
            </form>
        </div>
      </FlexWrapper>
    </PageWrapper>
  )
}

export default Page