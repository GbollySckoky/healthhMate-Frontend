const MessageSkeleton = ({ patient = false }: { patient?: boolean }) => {
  return (
    <div className={`flex ${patient ? "justify-end" : "justify-start"}`}>
      <div
        className={`animate-pulse rounded-2xl px-4 py-3 ${
          patient
            ? "w-[55%] rounded-br-sm bg-red-900/20"
            : "w-[50%] rounded-bl-sm bg-white shadow-sm"
        }`}
      >
        <div className="h-3 w-full rounded bg-gray-200" />
        <div className="mt-2 h-3 w-3/4 rounded bg-gray-200" />

        <div className="mt-3 flex justify-end">
          <div className="h-2 w-10 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

/**
 * Message-area skeleton only. Use this INSIDE <main> while message history
 * loads, under the real header and input bar.
 */
export const MessageListSkeleton = () => {
  return (
    <div className="mx-auto flex  max-w-3xl flex-col justify-end gap-4">
      <MessageSkeleton />
      <MessageSkeleton patient />
      <MessageSkeleton />
      <MessageSkeleton patient />
      <MessageSkeleton />
      <MessageSkeleton patient />
    </div>
  );
};

/**
 * Full-page skeleton. Use this as an early return while the conversation
 * itself (doctor info, communication id) loads.
 */
const CommunicationSkeleton = () => {
  return (
    <div className="flex flex-col bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 z-20 mt-14 w-full bg-red-900 px-4 py-3 shadow-sm">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="h-12 w-12 animate-pulse rounded-full bg-red-800" />

            <div className="space-y-2">
              {/* Doctor name */}
              <div className="h-4 w-32 animate-pulse rounded bg-red-800" />
              {/* Online */}
              <div className="h-3 w-14 animate-pulse rounded bg-red-800" />
            </div>
          </div>

          {/* Call button */}
          <div className="h-10 w-10 animate-pulse rounded-full bg-red-800" />
        </div>
      </header>

      {/* Messages */}
      <main className="mt-16 flex-1 overflow-hidden px-4 py-6 pb-24">
        <MessageListSkeleton />
      </main>

      {/* Input */}
      <div className="fixed bottom-0 w-full border-t border-gray-200 bg-white p-4">
        <div className="mx-auto flex max-w-3xl items-center gap-3">
          <div className="h-12 flex-1 animate-pulse rounded-xl bg-gray-100" />
          <div className="h-12 w-12 shrink-0 animate-pulse rounded-xl bg-red-900/20" />
        </div>
      </div>
    </div>
  );
};

export default CommunicationSkeleton;