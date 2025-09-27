"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Trash2, Info } from "lucide-react"

type LocationData = {
  id: string
  name: string
  code: string
  imageUrl: string
}

export function SectionCard() {
  const [data, setData] = React.useState<LocationData[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    // Fake API call
    setTimeout(() => {
      setData([
        {
          id: "1",
          name: "Khu vực A",
          code: "KV-A",
          imageUrl: "https://picsum.photos/400/300?random=1"
        },
        {
          id: "2",
          name: "Khu vực B",
          code: "KV-B",
          imageUrl: "https://picsum.photos/400/300?random=2"
        },
        {
          id: "3",
          name: "Khu vực C",
          code: "KV-C",
          imageUrl: "" // test fallback "No Image"
        }
      ])
      setLoading(false)
    }, 1000) // giả lập delay 1s
  }, [])

  const handleDelete = (id: string) => {
    alert(`Xóa thiết bị với ID: ${id}`)
  }

  const handleDetail = (id: string) => {
    alert(`Chi tiết thiết bị với ID: ${id}`)
  }

  if (loading) {
    return <div className="p-4">Đang tải dữ liệu...</div>
  }

  if (data.length === 0) {
    return <div className="p-4">Không có dữ liệu</div>
  }

  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 md:grid-cols-2 xl:grid-cols-4">
      {data.map((item) => (
        <div
          key={item.id}
          className="flex flex-col rounded-md border shadow-sm bg-card overflow-hidden"
        >
          <div className="p-4 flex flex-col gap-2 flex-1">
            <div>
              <h3 className="text-base font-semibold">{item.name}</h3>
              <p className="text-sm text-muted-foreground">
                Mã khu vực: {item.code}
              </p>
            </div>

            <div className="w-full h-32 bg-gray-500 border-2 border-muted rounded-md overflow-hidden">
              <img
                src={
                  item.imageUrl ||
                  "https://via.placeholder.com/400x300?text=No+Image"
                }
                alt={item.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "https://via.placeholder.com/400x300?text=No+Image"
                }}
              />
            </div>

            <div className="flex justify-between items-center w-full">
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
                className="flex items-center gap-1 transition-colors duration-200 bg-red-500 text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-800"
                onClick={() => handleDelete(item.id)}
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
