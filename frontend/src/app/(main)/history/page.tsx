"use client"

import { useEffect, useState } from "react"
import { useBreadcrumb } from "@/context/breadcrumbContext"
import { DateRangePicker } from "./dateRangePicker"
import { HistoryTable } from "./historyTable"
import { Button } from "@/components/ui/button"
import { DateRange } from "react-day-picker"

import { Card, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

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
           <Card>
        <CardHeader>
          <div className="text-xl font-bold">Lịch sử vườn</div>
          <Separator className="my-2"/>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4">
              {/* Bên trái: DateRangePicker */}
                        <DateRangePicker value={dateRange} onChange={setDateRange} />

              {/* Bên phải: Search */}
                      <Button
          variant="outline"
          onClick={handleReset}
          className="transition-colors hover:bg-blue-50 dark:hover:bg-blue-800"
        >
          Đặt lại
        </Button>
            </div>
        </CardHeader>
      </Card>
              <HistoryTable data={filtered} />



    </>
  )
}
