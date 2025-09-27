"use client"

import React, { useState, useEffect } from "react"
import { LocationSelect } from "@/components/button/locationSelect"
import { Device, Schedule } from "@/types/garden"
import ManualControlCard from "./ManualControlCard"
import ScheduleCard from "./ScheduleCard"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function GardenControlPage() {
  const [locationId, setLocationId] = useState<string>("")
  const [devices, setDevices] = useState<Device[]>([])
  const [schedules, setSchedules] = useState<Schedule[]>([])

  // Lấy danh sách device khi locationId thay đổi
  useEffect(() => {
    // Đây là dữ liệu mẫu, thay bằng API thực tế nếu cần
    const sampleDevices: Record<string, Device[]> = {
      [locationId]: [
        { id: 1, name: "Bơm nước", active: false },
        { id: 2, name: "Đèn LED", active: false },
        { id: 3, name: "Quạt", active: false },
      ],
    }

    setDevices(sampleDevices[locationId] || [])
    setSchedules([]) // xóa lịch cũ khi đổi location
  }, [locationId])

  const toggleDevice = (id: number) => {
    setDevices(devices.map(d => (d.id === id ? { ...d, active: !d.active } : d)))
  }

  const addSchedule = (deviceId: number, hour: number, minute: number, repeatDays: number[]) => {
    setSchedules([...schedules, { deviceId, hour, minute, repeatDays }])
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-row justify-between px-4">
        <div className="text-2xl font-bold">Chăm sóc vườn</div>
        <div className="p-3 rounded-lg border border-blue-400 dark:border-blue-500 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Chọn khu vực</label>
            <LocationSelect locationId={locationId} onChange={setLocationId} />
          </div>
        </div>
      </div>

      <Tabs defaultValue="timer" className="space-y-6">
      <TabsList className="grid w-full grid-cols-2 m-0">
        <TabsTrigger value="timer">Hẹn giờ</TabsTrigger>
        <TabsTrigger value="manual">Điều khiển thủ công</TabsTrigger>
      </TabsList>
        <TabsContent value="timer" className="space-y-6">
                    <ScheduleCard devices={devices} schedules={schedules} addSchedule={addSchedule} />

        </TabsContent>
        <TabsContent value="manual" className="space-y-6">
                    <ManualControlCard devices={devices} toggleDevice={toggleDevice} />

        </TabsContent>
      </Tabs>
    </div>
  )
}
