export enum SensorType {
  TEMPERATURE = "temperature",
  SOIL_MOISTURE = "soilMoisture",
  HUMIDITY = "humidity",
  LIGHT = "light",
}
export const sensorLabels: Record<SensorType, string> = {
  [SensorType.TEMPERATURE]: "Nhiệt độ",
  [SensorType.HUMIDITY]: "Độ ẩm không khí",
  [SensorType.LIGHT]: "Ánh sáng",
  [SensorType.SOIL_MOISTURE]: "Độ ẩm đất",
};