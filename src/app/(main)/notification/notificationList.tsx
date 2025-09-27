"use client";

import { Notification } from "./page";

interface NotificationListProps {
  notifications: Notification[];
}

export default function NotificationList({ notifications }: NotificationListProps) {
  return (
    <div className="flex flex-col gap-4 ">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`p-4 rounded border-l-4 ${
            n.type === "info"
                ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900"
                : n.type === "warning"
                ? "border-yellow-500 bg-yellow-50 dark:border-yellow-400 dark:bg-yellow-900"
                : "border-red-500 bg-red-50 dark:border-red-400 dark:bg-red-900"
          }`}
        >
          <div className="flex justify-between">
            <div className="font-medium">{n.title}</div>
            <div className="text-sm">
              {n.time.toLocaleString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
          <div>{n.message}</div>
        </div>
      ))}
      {notifications.length === 0 && (
        <div className="text-gray-500">Không tìm thấy thông báo nào.</div>
      )}
    </div>
  );
}
