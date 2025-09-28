"use client"

import { useEffect } from "react"
import React from "react"
import { useBreadcrumb } from "@/context/breadcrumbContext"
import { SectionCard } from "./sectionCard"
import { Card, CardHeader } from "@/components/ui/components/ui/card"
import { Separator } from "@/components/ui/components/ui/separator"
import { InsertLocationDialog } from "./insert"
import { Button } from "@/components/ui/components/ui/button"
export default function Page() {
  const { setBreadcrumb } = useBreadcrumb();
  const [open, setOpen] = React.useState(false)

  useEffect(() => {
    setBreadcrumb([
      { title: "Quản lí khu vực", href: "/location" },
    ])
  }, [setBreadcrumb]);


  return (
    <>
      {/* Header */}
       <Card>
        <CardHeader>
          <div className="text-xl font-bold">Danh sách khu vực</div>
          <Separator className="my-2"/>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4">
              {/* Bên trái: DateRangePicker */}
    <div></div>
              {/* Bên phải: Search */}
                            <Button onClick={() => setOpen(true)} className="bg-blue-500 text-white">+ Thêm mới</Button>
              <InsertLocationDialog isOpen={open} onClose={() => setOpen(false)} />

              
            </div>
        </CardHeader>
      </Card>


      <div className="flex flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCard/>
          </div>
        </div>
      </div>
    </>
  )

}
