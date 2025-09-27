"use client"

import * as React from "react"
import {
  Leaf,
  Sparkles,
  Bell,
  House,
  Cpu, MapPin, Calendar, Bird
} from "lucide-react"

import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"



const navMain = [
    { title: "AI chat", url: "/aiChat", icon: Sparkles },
    { title: "Trang chủ", url: "/", icon: House },
    { title: "Thông báo", url: "/notification", icon: Bell },
  ]
const navApp = [
    { title: "Quản lí thiết bị", url: "/device", icon: Cpu },
    { title: "Quản lí khu vực", url: "/location", icon: MapPin },
    { title: "Lịch sử vườn", url: "/history", icon: Calendar },
    { title: "Chăm sóc vườn", url: "/care", icon: Bird },
  ]


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  return (
    <Sidebar 
      variant="inset" 
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-ring text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Leaf className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">SmartFarm</span>
                  <span className="truncate text-xs">V1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavMain items={navApp} label="Chung" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
