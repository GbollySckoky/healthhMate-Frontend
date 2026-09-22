import type { KeyboardEvent } from "react";

import { focusRing } from "./Primitives";

export type RecordsTab = "overview" | "consultations" | "prescriptions";

export type TabItem = {
  value: RecordsTab;
  label: string;
  count?: number;
};

export const tabId = (tab: RecordsTab) => `records-tab-${tab}`;
export const panelId = (tab: RecordsTab) => `records-panel-${tab}`;

export function RecordsTabs({
  tabs,
  activeTab,
  onChange,
}: {
  tabs: TabItem[];
  activeTab: RecordsTab;
  onChange: (tab: RecordsTab) => void;
}) {
  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = tabs.length - 1;

    const nextIndex =
      event.key === "ArrowRight"
        ? index === last
          ? 0
          : index + 1
        : event.key === "ArrowLeft"
          ? index === 0
            ? last
            : index - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;

    if (nextIndex === null) return;

    event.preventDefault();

    const next = tabs[nextIndex];

    onChange(next.value);
    document.getElementById(tabId(next.value))?.focus();
  }

  return (
    <div
      role="tablist"
      aria-label="Medical record sections"
      className="flex gap-6 overflow-x-auto border-b border-slate-200"
    >
      {tabs.map((tab, index) => {
        const isActive = activeTab === tab.value;

        return (
          <button
            key={tab.value}
            id={tabId(tab.value)}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={panelId(tab.value)}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(tab.value)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={`flex shrink-0 items-center gap-2 rounded-t border-b-2 px-1 pb-3 pt-2 text-sm font-medium transition-colors ${focusRing} ${
              isActive
                ? "border-red-800 text-red-800"
                : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-800"
            }`}
          >
            {tab.label}

            {tab.count !== undefined && (
              <span
                className={`rounded-full px-2 py-0.5 text-xs ${
                  isActive
                    ? "bg-red-800 text-red-100"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}