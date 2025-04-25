import { AuditHeader } from "./AuditHeader"
import { AuditTabs } from "./AuditTabs"
import { AuditEntity } from "./AuditEntity"
import DndTreeAccordion from "@/components/DndTreeAccordion/DndTreeAccordion"

export default function AuditDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6">
      <div className="md:col-span-3 space-y-6">
        <AuditHeader
          title="Financial Risk Assessment Audit"
          description="Comprehensive evaluation of risk management practices and financial controls within the organization."
        />
        <AuditTabs />
        <AuditEntity />
      </div>

      <div className="md:col-span-9 bg-muted rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Audit Dashboard</h2>
        <DndTreeAccordion />
      </div>
    </div>
  )
}
