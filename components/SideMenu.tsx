import { Home, Settings, Users, FileText, BarChart3, HelpCircle } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

// Navigation items
const navigationItems = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/dashboard",
    isActive: true,
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "/analytics",
  },
  {
    title: "Users",
    icon: Users,
    href: "/users",
  },
  {
    title: "Documents",
    icon: FileText,
    href: "/documents",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
  {
    title: "Help",
    icon: HelpCircle,
    href: "/help",
  },
]

export function SideMenu() {
  return (
    <Sidebar collapsible="icon" className="border-r transition-all duration-300 ease-in-out">
      <SidebarContent className="pt-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.isActive}
                    tooltip={item.title}
                    className="group relative transition-all duration-300 ease-in-out hover:translate-x-1 hover:shadow-md"
                  >
                    <Link href={item.href} className="flex items-center justify-between">
                      <item.icon className="h-5 w-5" />
                      <span className="ml-2">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}