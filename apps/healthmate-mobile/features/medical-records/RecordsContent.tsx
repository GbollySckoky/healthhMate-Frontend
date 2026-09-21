"use client";

import { useState } from "react";
import { ClipboardList, Pill, Stethoscope } from "lucide-react";

import type {
  ConsultationNote,
  Prescription,
} from "@/lib/interface/medical-records";
import type useGetMedicalRecords from "@/hooks/useGetMedicalRecords";

// import { ConsultationItem } from "./consultation-item";
// import { PatientOverview } from "./patient-overview";
// import { PrescriptionItem } from "./prescription-item";
import {
  EmptyState,
  LinkButton,
  RecordList,
  SectionHeader,
} from "./Primitives";
import {
  RecordsTabs,
  panelId,
  tabId,
  type RecordsTab,
  type TabItem,
} from "./RecordsTabs";
import { PrescriptionItem } from "./PrescriptionItem";
import { PatientOverview } from "./PatientOverview";
import { ConsultationItem } from "./ConsultationItem";

type MedicalRecords = NonNullable<
  ReturnType<typeof useGetMedicalRecords>["medicalRecords"]
>;

const OVERVIEW_LIMIT = 3;

const RecordsContent = ({ records }: { records: MedicalRecords }) => {
  const [activeTab, setActiveTab] = useState<RecordsTab>("overview");

  const patient = records.patient;
  const consultations = records.consultationNotes ?? [];
  const prescriptions = records.prescriptions ?? [];

  const tabs: TabItem[] = [
    { label: "Overview", value: "overview" },
    {
      label: "Consultations",
      value: "consultations",
      count: consultations.length,
    },
    {
      label: "Prescriptions",
      value: "prescriptions",
      count: prescriptions.length,
    },
  ];

  return (
    <>
      <RecordsTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div
        role="tabpanel"
        id={panelId(activeTab)}
        aria-labelledby={tabId(activeTab)}
        className="mt-6"
      >
        {activeTab === "overview" && (
          <div className="space-y-6">
            <PatientOverview patient={patient} />

            <div className="grid gap-6 lg:grid-cols-2">
              <section>
                <SectionHeader
                  icon={Stethoscope}
                  title="Recent consultations"
                  description="Your latest clinical notes"
                  action={
                    consultations.length > OVERVIEW_LIMIT && (
                      <LinkButton onClick={() => setActiveTab("consultations")}>
                        View all
                      </LinkButton>
                    )
                  }
                />

                {consultations.length === 0 ? (
                  <EmptyState
                    icon={ClipboardList}
                    title="No consultations yet"
                    description="Notes from your doctor appear here after a consultation."
                  />
                ) : (
                  <RecordList label="Recent consultations">
                    {consultations
                      .slice(0, OVERVIEW_LIMIT)
                      .map((note: ConsultationNote) => (
                        <ConsultationItem key={note.id} note={note} compact />
                      ))}
                  </RecordList>
                )}
              </section>

              <section>
                <SectionHeader
                  icon={Pill}
                  title="Recent prescriptions"
                  description="Your latest prescribed medications"
                  action={
                    prescriptions.length > OVERVIEW_LIMIT && (
                      <LinkButton onClick={() => setActiveTab("prescriptions")}>
                        View all
                      </LinkButton>
                    )
                  }
                />

                {prescriptions.length === 0 ? (
                  <EmptyState
                    icon={Pill}
                    title="No prescriptions yet"
                    description="Medications your doctor prescribes appear here."
                  />
                ) : (
                  <RecordList label="Recent prescriptions">
                    {prescriptions
                      .slice(0, OVERVIEW_LIMIT)
                      .map((prescription: Prescription) => (
                        <PrescriptionItem
                          key={prescription.id}
                          prescription={prescription}
                          compact
                        />
                      ))}
                  </RecordList>
                )}
              </section>
            </div>
          </div>
        )}

        {activeTab === "consultations" && (
          <section>
            <SectionHeader
              icon={Stethoscope}
              title="Consultation history"
              description="Review your previous consultations and clinical notes."
            />

            {consultations.length === 0 ? (
              <EmptyState
                icon={ClipboardList}
                title="No consultation records"
                description="Notes from your doctor appear here after a consultation."
              />
            ) : (
              <RecordList label="Consultation history">
                {consultations.map((note: ConsultationNote) => (
                  <ConsultationItem key={note.id} note={note} />
                ))}
              </RecordList>
            )}
          </section>
        )}

        {activeTab === "prescriptions" && (
          <section>
            <SectionHeader
              icon={Pill}
              title="Prescriptions"
              description="Review your prescribed medications and instructions."
            />

            {prescriptions.length === 0 ? (
              <EmptyState
                icon={Pill}
                title="No prescriptions"
                description="Medications your doctor prescribes appear here."
              />
            ) : (
              <RecordList label="Prescriptions">
                {prescriptions.map((prescription: Prescription) => (
                  <PrescriptionItem
                    key={prescription.id}
                    prescription={prescription}
                  />
                ))}
              </RecordList>
            )}
          </section>
        )}
      </div>
    </>
  );
}

export default RecordsContent