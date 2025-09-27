"use client"

import React from "react"

type HistoryItem = {
  id: number
  time: string
  device: string
  event: string
}

type Props = {
  data: HistoryItem[]
}

export const HistoryTable: React.FC<Props> = ({ data }) => {
  const getEventColor = (event: string) => {
    switch (event) {
      case "ON":
        return "text-green-700 dark:text-green-400 font-semibold"
      case "OFF":
        return "text-red-700 dark:text-red-400 font-semibold"
      default:
        return "text-gray-700 dark:text-gray-300"
    }
  }

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-200 dark:bg-gray-700">
          <tr>
            <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Thời gian</th>
            <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Thiết bị</th>
            <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Sự kiện</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center py-4 text-gray-500 dark:text-gray-400">
                Không có dữ liệu
              </td>
            </tr>
          ) : (
            data.map((item, idx) => (
              <tr
                key={item.id}
                className={`
                  border-t
                  ${idx % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-900"}
                  hover:bg-blue-50 dark:hover:bg-blue-900
                  transition-colors
                `}
              >
                <td className="px-4 py-2">{item.time}</td>
                <td className="px-4 py-2">{item.device}</td>
                <td className={`px-4 py-2 ${getEventColor(item.event)}`}>{item.event}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
