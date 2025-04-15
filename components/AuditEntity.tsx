import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChartIcon as ChartPieIcon, BarChart3Icon } from "lucide-react"

export function AuditEntity() {
  const entities = [
    {
      id: "irm",
      name: "IRM - Model Risk",
      description: "Internal risk management model validation and assessment",
      icon: ChartPieIcon,
    },
    {
      id: "cfo",
      name: "CFO - Modeling and Analytics",
      description: "Financial modeling and analytical framework evaluation",
      icon: BarChart3Icon,
    },
    {
      id: "treasury",
      name: "Treasury - Liquidity Risk",
      description: "Assessment of liquidity management practices and cash flow forecasting",
      icon: ChartPieIcon,
    },
    {
      id: "compliance",
      name: "Compliance - Regulatory Reporting",
      description: "Evaluation of regulatory reporting accuracy and timeliness",
      icon: BarChart3Icon,
    },
    {
      id: "operations",
      name: "Operations - Process Efficiency",
      description: "Analysis of operational processes and efficiency metrics",
      icon: ChartPieIcon,
    },
    {
      id: "it",
      name: "IT - System Controls",
      description: "Review of information technology controls and security measures",
      icon: BarChart3Icon,
    },
  ]

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-md">Audit Entity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 h-[250px] overflow-y-auto pr-1">
        {entities.map((entity) => (
          <div
            key={entity.id}
            className="flex items-start gap-3 p-3 rounded-md hover:bg-accent cursor-pointer transition-colors"
          >
            <div className="bg-primary/10 p-2 rounded-md">
              <entity.icon className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-1 flex-1">
              <div>
                <h3 className="font-medium text-sm">{entity.name}</h3>
              </div>
              <p className="text-xs text-muted-foreground">{entity.description}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
