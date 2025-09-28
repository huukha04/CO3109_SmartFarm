"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Power } from "lucide-react"
import { Device } from "@/types/garden"

export default function ManualControlCard({
  devices,
  toggleDevice,
}: {
  devices: Device[]
  toggleDevice: (id: number) => void
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Điều khiển thủ công</CardTitle>
        <CardDescription>
          Bật/tắt thiết bị ngay lập tức
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {devices.map(device => (
          <div key={device.id} className="relative rounded-lg p-3 bg-gray-100 dark:bg-gray-800 flex items-center justify-between">
            {/* Tên thiết bị */}
            <span className={`font-medium text-lg ${device.active ? "text-green-800 dark:text-green-200" : "text-red-700 dark:text-red-300"}`}>
              {device.name}
            </span>

            {/* Button bật/tắt đặt ra ngoài background card */}
            <div className="absolute right-[-0.75rem] top-1/2 -translate-y-1/2">
              <Button
                variant="outline"
                className={`${device.active ? "bg-green-500 text-white hover:bg-green-600" : "bg-red-500 text-white hover:bg-red-600"} transition-colors`}
                onClick={() => toggleDevice(device.id)}
              >
                <Power className="mr-2 h-4 w-4" />
                {device.active ? "Tắt" : "Bật"}
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
