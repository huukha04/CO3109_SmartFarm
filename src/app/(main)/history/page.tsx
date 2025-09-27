"use client"

import { useEffect, useState } from "react"
import { useBreadcrumb } from "@/context/breadcrumbContext"
import { DateRangePicker } from "./dateRangePicker"
import { HistoryTable } from "./historyTable"
import { Button } from "@/components/ui/button"
import { DateRange } from "react-day-picker"

type HistoryItem = {
  id: number
  time: string
  device: string
  event: string
}

export default function Page() {
  const { setBreadcrumb } = useBreadcrumb()
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [data, setData] = useState<HistoryItem[]>([])
  const [filtered, setFiltered] = useState<HistoryItem[]>([])

  useEffect(() => {
    setBreadcrumb([{ title: "Lịch sử vườn", href: "/history" }])
  }, [setBreadcrumb])

  useEffect(() => {
    const sample: HistoryItem[] = [
      { id: 1, time: "2025-09-25 10:20", device: "Bơm nước", event: "ON" },
      { id: 2, time: "2025-09-25 10:40", device: "Bơm nước", event: "OFF" },
      { id: 3, time: "2025-09-26 08:15", device: "Đèn UV", event: "ON" },
      { id: 4, time: "2025-09-26 08:30", device: "Đèn UV", event: "OFF" },
    ]
    setData(sample)
    setFiltered(sample)
  }, [dateRange])

  const handleReset = () => {
    setDateRange(undefined)
    setFiltered(data)
  }

  return (
    <>
      <div className="flex flex-row justify-between-4">
        <div className="text-2xl font-bold">Lịch sử vườn</div>
      </div>

      <div className="flex flex-col px-8 py-4">
        {/* Bộ lọc nằm trái */}
        <div className="flex flex-wrap items-end gap-2 mb-4 w-full justify-between">
        <div className="flex items-center gap-2 p-3 rounded-md border border-blue-400 dark:border-blue-500 shadow-sm">
          <DateRangePicker value={dateRange} onChange={setDateRange} />
        </div>
        <Button
          variant="outline"
          onClick={handleReset}
          className="transition-colors hover:bg-blue-50 dark:hover:bg-blue-800"
        >
          Đặt lại
        </Button>
      </div>

        {/* Bảng lịch sử */}
        <HistoryTable data={filtered} />
      </div>
    </>
  )
}
