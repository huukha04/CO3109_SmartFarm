"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Trash2, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"

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
      // Giả lập fetch dữ liệu từ API
      const sampleData: LocationData[] = [
        { id: "1", name: 'Cảm biến ánh sáng', code: 'VL001', status: 'on' },
        { id: "2", name: 'Cảm biến nhiệt độ', code: 'VT002', status: 'off' },
        { id: "3", name: 'Cảm biến độ ẩm không khí', code: 'VD003', status: 'on' },
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
    // Thêm logic xóa thiết bị ở đây
  }
  const handleDetail = (id: string) => {
    alert(`Chi tiết thiết bị với ID: ${id}`);
    // Thêm logic chi tiết thiết bị ở đây
  }

  // Render trạng thái với dark mode và chữ/nền đẹp hơn
  const renderStatus = (status: LocationData["status"]) => {
    switch (status) {
      case "on":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100">
            Bật
          </Badge>
        )
      case "off":
        return (
          <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
            Tắt
          </Badge>
        )
      case "error":
        return (
          <Badge className="bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100">
            Lỗi
          </Badge>
        )
      default:
        return <Badge variant="outline">Không xác định</Badge>
    }
  }


  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 md:grid-cols-2 xl:grid-cols-4">
      {data.map((item) => (
        <div
          key={item.id}
          className="flex flex-col rounded-md border bg-card shadow-sm overflow-hidden dark:border-slate-700"
        >
          {/* Nội dung */}
          <div className="p-4 flex flex-col gap-3 flex-1">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{item.name}</h3>
                <p className="text-sm text-muted-foreground dark:text-muted-foreground/70">
                  Mã khu vực: {item.code}
                </p>
              </div>
              {renderStatus(item.status)}
            </div>

            {/* Nút hành động */}
           <div className="flex justify-between items-center w-full">
              {/* Nút Chi tiết */}
              <Button
                size="sm"
                variant="outline"
                className="flex items-center gap-1 transition-colors duration-200 hover:bg-blue-50 dark:hover:bg-blue-900"
                onClick={() => handleDetail(item.id)} // Xử lý chi tiết
              >
                <Info className="w-4 h-4" /> Chi tiết
              </Button>

              {/* Nút Xóa */}
              <Button
                size="sm"
                variant="destructive"
                className="flex items-center gap-1 transition-colors duration-200
                          bg-red-500 text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-800"
                onClick={() => handleDelete(item.id)} // Xử lý xóa
              >
                <Trash2 className="w-4 h-4" /> Xóa
              </Button>

            </div>

          </div>
        </div>
      ))}
    </div>
  )
}
