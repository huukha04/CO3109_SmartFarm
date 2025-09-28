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
        <CardDescription>
          Chọn thời gian và ngày tuần để tự động bật/tắt thiết bị
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Form mỗi thiết bị */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {devices.map(device => (
            <ScheduleForm
              key={device.id}
              device={device}
              onAdd={(hour, minute, repeatDays) =>
                addSchedule(device.id, hour, minute, repeatDays)
              }
            />
          ))}
        </div>

        {/* Hiển thị danh sách lịch */}
        <div className="mt-4 space-y-2">
          <Label>Lịch đã cài đặt:</Label>
          <div className="flex flex-col gap-2">
            {schedules.map((s, idx) => {
              const deviceName = devices.find(d => d.id === s.deviceId)?.name || ""
              return (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center border rounded px-3 py-2"
                >
                  <span className="font-medium">{deviceName}</span>
                  <span className="text-sm text-muted-foreground">
                    {s.hour.toString().padStart(2, "0")}:
                    {s.minute.toString().padStart(2, "0")} - Lặp:{" "}
                    {s.repeatDays.map(d => weekDays[d]).join(", ")}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
