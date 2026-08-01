"use client";

import { useRouter } from "next/navigation";
import { Pencil, Plus } from "lucide-react";

import { trackData } from "@/constants/data";
import { ROUTES } from "@/constants/route";

import { Card, PageWrapper } from "@/components/Reusable";

import EditModal from "./EditModal";
import useTracker from "@/hooks/useTrackers";

const ReminderScreen = () => {
  const router = useRouter();
  const { displayComponents, handleDisplayComponent } = useTracker();

  return (
    <div>
    <PageWrapper>
      <div className="mb-9">
        <h3 className="mb-2 text-sm font-normal text-gray-900">
          Recent Logs Snapshot
        </h3>

        <Card>
          {trackData.map((item, index) => {
            const isLastItem =
              index === trackData.length - 1;

            return (
              <div
                key={item.id}
                className={`py-4 ${
                  !isLastItem
                    ? "border-b border-gray-200"
                    : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="rounded bg-pink-50 p-2 text-lg">
                      {item.icon}
                    </div>

                    <div className="ml-4">
                      <h4 className="text-sm font-medium text-gray-900">
                        {item.med}
                      </h4>

                      <p className="mt-1 text-xs text-gray-500">
                        {item.time}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      handleDisplayComponent("1")
                    }
                    className="text-gray-500 transition hover:text-pink-600"
                  >
                    <Pencil size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </Card>
      </div>
    </PageWrapper>

      {/* Floating Button */}
      <button
        type="button"
        onClick={() =>
          router.push(ROUTES.addReminder)
        }
        className="fixed bottom-6 right-6 flex items-center gap-2 rounded-lg bg-pink-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-pink-700"
      >
        <Plus size={18} />
        Add New Reminder
      </button>

      {displayComponents === "1" && (
        <EditModal
          handleDisplayComponent={
            handleDisplayComponent
          }
        />
      )}
    </div>
  );
};

export default ReminderScreen;