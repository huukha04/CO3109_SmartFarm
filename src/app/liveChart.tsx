"use client"
import React from "react"
import {
  CartesianGrid,
  LabelList,
  Legend,
  Line,
  LineChart,
  XAxis,
} from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

type ChartConfigItem = { label: string; color: string }
type ChartConfig = Record<string, ChartConfigItem>
const colors = ["var(--chart-1)","var(--chart-2)","var(--chart-3)","var(--chart-4)","var(--chart-5)","var(--chart-6)"]

type LiveData = Record<string, string | number> & { xLine: string }

type Props = {
  locationId?: string
  sensorType: string
  time?: string
}

export function LiveChart({ locationId, sensorType, time }: Props) {
  const [data, setData] = React.useState<LiveData[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    setLoading(true)

    
    const generateSampleData = () =>
      ["January", "February", "March", "April", "May", "June"].map((month) => ({
        xLine: month,
        Device_1: Math.floor(Math.random() * 300),
        Device_2: Math.floor(Math.random() * 200),
        Device_3: Math.floor(Math.random() * 100),
        "Trung bình": Math.floor(Math.random() * 10),
    }));
    const data = generateSampleData();
    setData(data);


    setLoading(false);
  }, [locationId, sensorType, time])

  if (loading) return <div className="p-4">Đang tải dữ liệu...</div>
  if (data.length === 0) return <div className="p-4">Không có dữ liệu</div>

  const keys = Object.keys(data[0]).filter((k) => k !== "xLine")
  const chartConfig: ChartConfig = keys.reduce((acc, key, idx) => {
    acc[key] = { label: key.charAt(0).toUpperCase() + key.slice(1), color: colors[idx % colors.length] }
    return acc
  }, {} as ChartConfig)

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {sensorType.replace(/\b\w/g, (c) => c.toUpperCase())} {time ? `- ${time}` : ""}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart data={data} margin={{ top: 20, left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="xLine" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(v) => String(v).slice(0, 3)} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            {Object.entries(chartConfig).map(([key, cfg]) => (
              <Line key={key} dataKey={key} type="natural" stroke={cfg.color} strokeWidth={2} dot={{ fill: cfg.color }} activeDot={{ r: 6 }}>
                <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
              </Line>
            ))}
            <Legend />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
