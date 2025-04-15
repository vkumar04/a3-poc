import { AuditHeader } from "./AuditHeader"
import { AuditTabs } from "./AuditTabs"
import { AuditEntity } from "./AuditEntity"

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
        <p className="text-muted-foreground">
          This is the main content area where audit details, charts, and analysis will be displayed. Select an item from
          the left panel to view detailed information.
        </p>
      </div>
    </div>
  )
}
