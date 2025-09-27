"use client"

import { useEffect } from "react"
import React from "react"
import { useBreadcrumb } from "@/context/breadcrumbContext"
import { SectionCard } from "./sectionCard"

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
      <div className="flex flex-row justify-between items-center px-4">
        <div className="text-2xl font-bold">Danh sách khu vực</div>
      <div>
          <Button onClick={() => setOpen(true)}>+ Thêm mới</Button>
          <InsertLocationDialog isOpen={open} onClose={() => setOpen(false)} />
        </div>
      </div>

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
