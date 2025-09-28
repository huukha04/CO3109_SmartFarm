"use client"

import { useEffect } from "react"
import React from "react"
import { useBreadcrumb } from "@/context/breadcrumbContext"
import { SectionCard } from "./sectionCard"

import { InsertDeviceDialog } from "./insertDeviceLog"
import { Button } from "@/components/ui/components/ui/button"
import { LocationSelect } from "@/components/button/locationSelect"
import { Card, CardHeader, CardContent } from "@/components/ui/components/ui/card"
import { Separator } from "@/components/ui/components/ui/separator"
export default function Page() {
  const { setBreadcrumb } = useBreadcrumb();
  const [open, setOpen] = React.useState(false)
  const [locationId, setLocationId] = React.useState<string>("");

  useEffect(() => {
    setBreadcrumb([
      { title: "Quản lí thiết bị", href: "/device" },
    ])
  }, [setBreadcrumb]);

  return (
    <>
      {/* Header */}
          <Card>
        <CardHeader>
          <div className="text-xl font-bold">Danh sách thiết bị</div>
          <Separator className="my-2"/>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4">
              {/* Bên trái: DateRangePicker */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Chọn khu vực</label>
                <LocationSelect locationId={locationId} onChange={setLocationId} />
              </div>
              {/* Bên phải: Search */}
              <div className="w-full md:w-auto">
                <div className="flex flex-col justify-end">
                  <Button onClick={() => setOpen(true)} className="bg-blue-500 text-white">+ Thêm mới</Button>
                </div>              
              </div>
            </div>
        </CardHeader>
      </Card>


      {/*  */}
      {/* <Card className="p-0">
        <CardContent> */}
          <InsertDeviceDialog isOpen={open} onClose={() => setOpen(false)} />
            <div className="flex flex-col">
              <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                  <SectionCard />
                </div>
              </div>
            </div>
        {/* </CardContent>
      </Card> */}
    </>
  )

}
