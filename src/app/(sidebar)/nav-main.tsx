import * as React from "react"
import { type LucideIcon } from "lucide-react"
import { usePathname } from "next/navigation"


import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"

type NavAppProps = {
  items: { title: string; url: string; icon: LucideIcon }[]
  label?: string
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>

export function NavMain({ items, label , ...props }: NavAppProps) {
  const pathname = usePathname() // lấy đường dẫn hiện tại

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
        <SidebarMenu>
          {items.map((item) => {
            const isActive = pathname === item.url // active nếu url trùng
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild size="sm" isActive={isActive}>
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
