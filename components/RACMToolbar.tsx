"use client"

import { Menu, Settings, Recycle, FileText, Import, MessageSquare, Download, ImportIcon as Export } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ToolbarButton } from "@/types/audit"

export default function RACMToolbar() {
  const leftButtons: ToolbarButton[] = [
    { icon: <FileText className="h-5 w-5" />, label: "Documents" },
    { icon: <Import className="h-5 w-5" />, label: "Import" },
    { icon: <MessageSquare className="h-5 w-5" />, label: "Feedback" },
    { icon: <Download className="h-5 w-5" />, label: "Download" },
    { icon: <Export className="h-5 w-5" />, label: "Export" },
  ]

  const rightButtons: ToolbarButton[] = [
    { icon: <Settings className="h-5 w-5" />, label: "Settings" },
    { icon: <Recycle className="h-5 w-5" />, label: "Recycle" },
  ]

  const menuItems = ["Complete and approve the preliminary RACM", "Perform background research", "Assess fraud risk"]

  return (
    <TooltipProvider delayDuration={300}>
      <div className="w-full flex justify-between items-center p-2 border-b bg-background">
        <div className="flex items-center gap-1">
          {/* Menu button with dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Menu</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Menu</p>
                </TooltipContent>
              </Tooltip>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {menuItems.map((item, index) => (
                <DropdownMenuItem key={index}>{item}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {leftButtons.map((button, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={button.onClick}>
                  {button.icon}
                  <span className="sr-only">{button.label}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{button.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        <div className="flex items-center gap-1">
          {rightButtons.map((button, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={button.onClick}>
                  {button.icon}
                  <span className="sr-only">{button.label}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{button.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </TooltipProvider>
  )
}
