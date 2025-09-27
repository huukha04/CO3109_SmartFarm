"use client";

import React, { JSX } from "react";
import { Thermometer, Droplets, Sun, Sprout } from "lucide-react";
import { SensorType } from "@/types/sensor";

// map tên icon → JSX element
const iconMap: Record<string, JSX.Element> = {
  temperature: <Thermometer className="w-7 h-7 text-red-500" />,
  soilMoisture: <Sprout className="w-7 h-7 text-green-500" />,
  humidity: <Droplets className="w-7 h-7 text-blue-500" />,
  light: <Sun className="w-7 h-7 text-yellow-500" />,
};

type LiveData = {
  id: number;
  title: string;
  note: string;
  value: string;
  unit: string;
  type: SensorType;
};

type Props = {
  locationId: string;
  onLocationChange?: (id: string) => void;
};

export function SectionCard({ locationId, onLocationChange }: Props) {
  const [data, setData] = React.useState<LiveData[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);

    // Dữ liệu mẫu
    const getRandomValue = (type: SensorType) => {
  switch (type) {
    case SensorType.TEMPERATURE:
      return (20 + Math.random() * 15).toFixed(1); // 20°C → 35°C
    case SensorType.SOIL_MOISTURE:
      return (30 + Math.random() * 40).toFixed(0); // 30% → 70%
    case SensorType.HUMIDITY:
      return (40 + Math.random() * 40).toFixed(0); // 40% → 80%
    case SensorType.LIGHT:
      return (500 + Math.random() * 1500).toFixed(0); // 500lx → 2000lx
    default:
      return "0";
  }
};

const sampleData: Record<string, LiveData[]> = {
  [locationId]: [
    { id: 1, title: "Nhiệt độ", note: "", value: getRandomValue(SensorType.TEMPERATURE), unit: "°C", type: SensorType.TEMPERATURE },
    { id: 2, title: "Độ ẩm đất", note: "", value: getRandomValue(SensorType.SOIL_MOISTURE), unit: "%", type: SensorType.SOIL_MOISTURE },
    { id: 3, title: "Độ ẩm không khí", note: "", value: getRandomValue(SensorType.HUMIDITY), unit: "%", type: SensorType.HUMIDITY },
    { id: 4, title: "Ánh sáng", note: "", value: getRandomValue(SensorType.LIGHT), unit: "lx", type: SensorType.LIGHT },
  ],
};


    setData(sampleData[locationId] || []);
    if (!sampleData[locationId] && onLocationChange) {
      onLocationChange(Object.keys(sampleData)[0]);
    }
    setLoading(false);
  }, [locationId, onLocationChange]);

  if (loading) return <div className="p-4">Đang tải dữ liệu...</div>;
  if (data.length === 0) return <div className="p-4">Không có dữ liệu</div>;

  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {data.map((item) => (
        <div key={item.id} className="flex items-center gap-3 rounded-md border px-4 py-2">
          {/* Icon */}
          <div className="w-8.5 h-8.5 rounded-sm flex items-center justify-center text-primary">
            {iconMap[item.type] ?? item.title.charAt(0)}
          </div>

          {/* Text */}
          <div className="flex flex-col gap-0.5">
            <span className="text-muted-foreground text-sm font-medium">{item.title}</span>
            <span className="text-lg font-medium">
              {item.value} {item.unit}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
