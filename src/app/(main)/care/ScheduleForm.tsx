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
    <div className="border rounded p-3 space-y-2">
      <Label>{device.name}</Label>
      <div className="flex gap-2">
        <Input
          type="number"
          min={0}
          max={23}
          value={hour}
          onChange={e => setHour(parseInt(e.target.value))}
          placeholder="Giờ"
        />
        <Input
          type="number"
          min={0}
          max={59}
          value={minute}
          onChange={e => setMinute(parseInt(e.target.value))}
          placeholder="Phút"
        />
      </div>
      <div className="flex gap-2">
        {weekDays.map((d, idx) => (
          <Button
            key={idx}
            size="sm"
            variant={repeatDays.includes(idx) ? "default" : "outline"}
            onClick={() => toggleDay(idx)}
          >
            {d}
          </Button>
        ))}
      </div>
      <Button onClick={() => onAdd(hour, minute, repeatDays)}>Thêm lịch</Button>
    </div>
  )
}
