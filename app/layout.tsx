import type { Metadata } from "next"
import { ThemeProvider } from "@/providers/ThemeProvider"
import "./globals.css"
import { Header } from "@/components/Header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { SideMenu } from "@/components/SideMenu"

export const metadata: Metadata = {
  title: "Ally Assurance Advisor",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider defaultOpen={false}>
              <div className="flex min-h-screen w-full">
                <SideMenu />
                <SidebarInset className="flex-1 w-full">
                  <div className="flex items-center">
                    <Header />
                  </div>
                  {children}
                </SidebarInset>
              </div>
            </SidebarProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
