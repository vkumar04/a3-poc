export interface Audit {
  id: string;
  title: string;
}

export interface AuditData {
  [year: string]: Audit[];
}