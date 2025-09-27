"use client"
import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import ScheduleForm from "./ScheduleForm"
import { Device, Schedule } from "@/types/garden"

export default function ScheduleCard({
  devices,
  schedules,
  addSchedule,
}: {
  devices: Device[]
  schedules: Schedule[]
  addSchedule: (deviceId: number, hour: number, minute: number, repeatDays: number[]) => void
}) {
  const weekDays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hẹn lịch</CardTitle>
        <CardDescription>Chọn thời gian và ngày tuần để tự động bật/tắt thiết bị</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {devices.map(device => (
          <ScheduleForm
            key={device.id}
            device={device}
            onAdd={(hour, minute, repeatDays) => addSchedule(device.id, hour, minute, repeatDays)}
          />
        ))}

        {/* Hiển thị danh sách lịch */}
        <div className="mt-4 space-y-2">
          <Label>Lịch đã cài đặt:</Label>
          {schedules.map((s, idx) => {
            const deviceName = devices.find(d => d.id === s.deviceId)?.name || ""
            return (
              <div key={idx} className="flex justify-between border rounded px-3 py-1">
                <span>{deviceName}</span>
                <span>
                  {s.hour.toString().padStart(2, "0")}:
                  {s.minute.toString().padStart(2, "0")} - Lặp:{" "}
                  {s.repeatDays.map(d => weekDays[d]).join(", ")}
                </span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
