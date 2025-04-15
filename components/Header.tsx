"use client"

import { Logo } from "@/components/Logo"
import { ThemeToggle } from "@/components/ThemeToggle"
import { UserMenu } from "@/components/UserMenu"
import { SidebarTrigger } from "./ui/sidebar"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 xl:px-0">
      <div className="w-full mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="mr-2">
            <span className="sr-only">Open sidebar</span>
          </SidebarTrigger>
          <Logo />
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <UserMenu />
        </div>
      </div>
    </header>
  )
}
