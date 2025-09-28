"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Trash2, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

type LocationData = {
  id: string
  name: string
  code: string
  imageUrl?: string
  status: "on" | "off" | "error"
}

export function SectionCard() {
  const [data, setData] = React.useState<LocationData[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    try {
      const sampleData: LocationData[] = [
        { id: "1", name: 'Cảm biến ánh sáng', code: 'VL001', status: 'on' },
        { id: "2", name: 'Cảm biến nhiệt độ', code: 'VT002', status: 'off' },
        { id: "3", name: 'Cảm biến độ ẩm không khí', code: 'VD003', status: 'on' },
        { id: "4", name: 'Cảm biến độ ẩm đất', code: 'VD004', status: 'error' },
        { id: "5", name: 'Cảm biến pH đất', code: 'VP005', status: 'on' },
        { id: "6", name: 'Cảm biến CO2', code: 'VC006', status: 'off' },
        { id: "7", name: 'Cảm biến O2', code: 'VO007', status: 'on' },
        { id: "8", name: 'Cảm biến mưa', code: 'VR008', status: 'on' },
        { id: "9", name: 'Cảm biến gió', code: 'VW009', status: 'off' },
      ]
      setData(sampleData || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [])

  if (loading) {
    return <div className="p-4 text-muted-foreground dark:text-muted-foreground/70">Đang tải dữ liệu...</div>
  }

  if (data.length === 0) {
    return <div className="p-4 text-muted-foreground dark:text-muted-foreground/70">Không có dữ liệu</div>
  }

  const handleDelete = (id: string) => {
    alert(`Xóa thiết bị với ID: ${id}`);
  }
  const handleDetail = (id: string) => {
    alert(`Chi tiết thiết bị với ID: ${id}`);
  }

  const renderStatus = (status: LocationData["status"]) => {
    switch (status) {
      case "on":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100">Bật</Badge>
      case "off":
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">Tắt</Badge>
      case "error":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100">Lỗi</Badge>
      default:
        return <Badge variant="outline">Không xác định</Badge>
    }
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {data.map((item) => (
        <Card key={item.id} className="flex flex-col">
          <CardHeader className="flex justify-between items-start">
            <div>
              <CardTitle className="text-base">{item.name}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground dark:text-muted-foreground/70">
                Mã thiết bị: {item.code}
              </CardDescription>
            </div>
            {renderStatus(item.status)}
          </CardHeader>

          <CardContent className="flex justify-between items-center pt-4">
            <Button
              size="sm"
              variant="outline"
              className="flex items-center gap-1 transition-colors duration-200 hover:bg-blue-50 dark:hover:bg-blue-900"
              onClick={() => handleDetail(item.id)}
            >
              <Info className="w-4 h-4" /> Chi tiết
            </Button>

            <Button
              size="sm"
              variant="destructive"
              className="flex items-center gap-1 transition-colors duration-200
                         bg-red-500 text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-800"
              onClick={() => handleDelete(item.id)}
            >
              <Trash2 className="w-4 h-4" /> Xóa
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
