import AuditSelector from "@/components/AuditSelector"

export default function RACMLayout({
    children,
  }: Readonly<{
    children: React.ReactNode
  }>) {
    return (
        <div className="p-4">
        <AuditSelector />
        {children}
        </div>
    )
  }