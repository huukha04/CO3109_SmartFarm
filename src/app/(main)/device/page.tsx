"use client"

import { useEffect } from "react"
import React from "react"
import { useBreadcrumb } from "@/context/breadcrumbContext"
import { SectionCard } from "./sectionCard"

import { InsertDeviceDialog } from "./insertDeviceLog"
import { Button } from "@/components/ui/components/ui/button"
import { LocationSelect } from "@/components/button/locationSelect"
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
      <div className="flex flex-row justify-between px-4">
        <div className="text-2xl font-bold">Danh sách thiết bị</div>
      </div>
      <div className="flex flex-row justify-between px-4">
        {/* Left: nút thêm mới căn dưới */}
        <div className="flex flex-col justify-end">
          <Button onClick={() => setOpen(true)}>+ Thêm mới</Button>
        </div>

        {/* Right: Chọn khu vực */}
        <div className="p-3 rounded-lg border border-blue-400 dark:border-blue-500 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Chọn khu vực</label>
            <LocationSelect locationId={locationId} onChange={setLocationId} />
          </div>
        </div>
      </div>

      {/*  */}
      <InsertDeviceDialog isOpen={open} onClose={() => setOpen(false)} />
      <div className="flex flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCard />
          </div>
        </div>
      </div>
    </>
  )

}
