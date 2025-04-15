import AuditSelector from "@/components/AuditSelector"
import RACMToolbar from "@/components/RACMToolbar"

export default function RACMLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <RACMToolbar />
      <div className="p-4">
        <AuditSelector />
        {children}
      </div>
    </>
  )
}