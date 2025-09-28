"use client"
import React, { useState } from "react"
import { Device } from "@/types/garden"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ScheduleForm({
  device,
  onAdd,
}: {
  device: Device
  onAdd: (hour: number, minute: number, repeatDays: number[]) => void
}) {
  const [hour, setHour] = useState<number>(0)
  const [minute, setMinute] = useState<number>(0)
  const [repeatDays, setRepeatDays] = useState<number[]>([])

  const toggleDay = (day: number) => {
    setRepeatDays(prev => (prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]))
  }

  const weekDays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"]

  return (
    <div className="border rounded p-3 space-y-3 ">
      {/* Tên thiết bị */}
      <Label className="font-bold text-gray-800 dark:text-gray-100">{device.name}</Label>

      {/* Thời gian */}
      <div className="flex flex-col sm:flex-row gap-2 items-end">
        <div className="flex flex-col flex-1">
          <Label className="text-gray-700 dark:text-gray-300">Giờ</Label>
          <Input
            type="number"
            min={0}
            max={23}
            value={hour}
            onChange={e => setHour(parseInt(e.target.value))}
            placeholder="Giờ"
            className="dark:bg-gray-700 dark:text-gray-100"
          />
        </div>
        <div className="flex flex-col flex-1">
          <Label className="text-gray-700 dark:text-gray-300">Phút</Label>
          <Input
            type="number"
            min={0}
            max={59}
            value={minute}
            onChange={e => setMinute(parseInt(e.target.value))}
            placeholder="Phút"
            className="dark:bg-gray-700 dark:text-gray-100"
          />
        </div>
      </div>

      {/* Chọn ngày */}
      <div className="flex flex-col gap-2">
        <Label className="text-gray-700 dark:text-gray-300">Lặp lại vào các ngày</Label>
        <div className="flex flex-wrap gap-2">
          {weekDays.map((d, idx) => (
            <Button
              key={idx}
              size="sm"
              className={`w-10 ${
                repeatDays.includes(idx)
                  ? "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                  : "bg-transparent border border-gray-300 text-gray-800 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700"
              }`}
              onClick={() => toggleDay(idx)}
            >
              {d}
            </Button>
          ))}
        </div>
      </div>

      {/* Thêm lịch */}
      <Button
        className="w-full bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white"
        onClick={() => onAdd(hour, minute, repeatDays)}
      >
        Thêm lịch
      </Button>
    </div>
  )
}
