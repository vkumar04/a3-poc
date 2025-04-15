import { AuditHeaderProps } from "@/types/audit"

export function AuditHeader({ title, description }: AuditHeaderProps) {
  return (
    <div className="space-y-2 bg-card p-4 rounded-lg shadow-sm">
      <h1 className="text-xl font-bold">{title}</h1>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
  