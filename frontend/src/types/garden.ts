import { SensorType } from "./sensor"

export interface Device {
  id: number
  name: string
  active: boolean
  auto?: boolean
  thresholdMin?: number   // ngưỡng min
  thresholdMax?: number   // ngưỡng max
  sensorType?: SensorType
}


export interface Schedule {
  deviceId: number
  hour: number
  minute: number
  repeatDays: number[]
}
