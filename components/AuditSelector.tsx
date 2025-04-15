"use client"

import { useState } from "react"
import { FileText } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { AuditData } from "@/types/audit"

export default function AuditSelector() {
  const [selectedYear, setSelectedYear] = useState<string>("2025")

  // Audit data with lorem ipsum titles
  const auditData: AuditData = {
    "2020": [
      { id: "2020-1", title: "Lorem ipsum dolor sit amet" },
      { id: "2020-2", title: "Consectetur adipiscing elit" },
      { id: "2020-3", title: "Sed do eiusmod tempor incididunt" },
      { id: "2020-4", title: "Ut labore et dolore magna aliqua" },
      { id: "2020-5", title: "Ut enim ad minim veniam" },
    ],
    "2021": [
      { id: "2021-1", title: "Quis nostrud exercitation ullamco" },
      { id: "2021-2", title: "Laboris nisi ut aliquip ex ea" },
      { id: "2021-3", title: "Commodo consequat duis aute" },
      { id: "2021-4", title: "Irure dolor in reprehenderit" },
      { id: "2021-5", title: "Voluptate velit esse cillum dolore" },
    ],
    "2022": [
      { id: "2022-1", title: "Eu fugiat nulla pariatur excepteur" },
      { id: "2022-2", title: "Sint occaecat cupidatat non proident" },
      { id: "2022-3", title: "Sunt in culpa qui officia" },
      { id: "2022-4", title: "Deserunt mollit anim id est laborum" },
      { id: "2022-5", title: "Sed ut perspiciatis unde omnis" },
    ],
    "2023": [
      { id: "2023-1", title: "Iste natus error sit voluptatem" },
      { id: "2023-2", title: "Accusantium doloremque laudantium" },
      { id: "2023-3", title: "Totam rem aperiam eaque ipsa" },
      { id: "2023-4", title: "Quae ab illo inventore veritatis" },
      { id: "2023-5", title: "Et quasi architecto beatae vitae" },
    ],
    "2024": [
      { id: "2024-1", title: "Dicta sunt explicabo nemo enim" },
      { id: "2024-2", title: "Ipsam voluptatem quia voluptas" },
      { id: "2024-3", title: "Sit aspernatur aut odit aut fugit" },
      { id: "2024-4", title: "Sed quia consequuntur magni" },
      { id: "2024-5", title: "Dolores eos qui ratione voluptatem" },
    ],
    "2025": [
      { id: "2025-1", title: "Sequi nesciunt neque porro quisquam" },
      { id: "2025-2", title: "Est qui dolorem ipsum quia dolor" },
      { id: "2025-3", title: "Sit amet consectetur adipisci velit" },
      { id: "2025-4", title: "Sed quia non numquam eius modi" },
      { id: "2025-5", title: "Tempora incidunt ut labore et dolore" },
    ],
  }

  return (
    <div className="w-full p-6">
      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center bg-card border rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-base font-medium">Year:</span>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[220px] text-base">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Years</SelectLabel>
                {Object.keys(auditData).map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2 flex-1">
          <span className="text-base font-medium">Audit:</span>
          <Select>
            <SelectTrigger className="w-full text-base">
              <SelectValue placeholder="Select an audit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Audits for {selectedYear}</SelectLabel>
                {auditData[selectedYear].map((audit) => (
                  <SelectItem key={audit.id} value={audit.id}>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>{audit.title}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
