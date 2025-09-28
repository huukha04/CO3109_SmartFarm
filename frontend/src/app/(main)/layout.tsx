"use client"

import * as React from "react"
import { AppSidebar } from "@/app/(sidebar)/sidebarApp"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { BreadcrumbProvider, useBreadcrumb } from "@/context/breadcrumbContext"
import { ThemeToggle } from "@/components/button/themeToggle"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
const InnerSidebarLayout = ({ children }: { children: React.ReactNode }) => {
  const { breadcrumb } = useBreadcrumb()

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-8 items-center gap-2 px-4 my-2">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-4" />
          {breadcrumb.length > 0 && (
            <div className="text-xl font-bold">
              {breadcrumb.map((item, idx) => (
                <span key={idx} className="mr-2">
                  {item.title}
                  {idx < breadcrumb.length - 1 && <span className="text-gray-400 dark:text-gray-500">/</span>}
                </span>
              ))}
            </div>
          )}
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </header>
        <div className="px-4">
          <Separator orientation="horizontal" className="my-2" />
        </div>

        <main className="flex flex-col flex-1 px-4 gap-4 pb-4">
          {children}
        </main>
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
