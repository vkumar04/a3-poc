import type { ReactNode } from "react"

export interface Audit {
  id: string;
  title: string;
}

export interface AuditData {
  [year: string]: Audit[];
}

export type ToolbarButton = {
  icon: ReactNode
  label: string
  onClick?: () => void
}

export interface AuditHeaderProps {
  title: string
  description: string
}