"use client"

import * as React from "react"
import { AppSidebar } from "@/app/(sidebar)/sidebarApp"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { BreadcrumbProvider, useBreadcrumb } from "@/context/breadcrumbContext"
import { ThemeToggle } from "@/components/button/themeToggle"

const InnerSidebarLayout = ({ children }: { children: React.ReactNode }) => {
  const { breadcrumb } = useBreadcrumb()

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-8 items-center gap-2 border-b px-4 py-2">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-4" />
          {/* Breadcrumb */}
          {breadcrumb.length > 0 && (
            <div className="flex gap-1">
              {breadcrumb.map((item, idx) => (
                <span key={idx}>{item.title}</span>
              ))}
            </div>
          )}
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1 p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  return (
    <BreadcrumbProvider>
      <InnerSidebarLayout>{children}</InnerSidebarLayout>
    </BreadcrumbProvider>
  )
}
