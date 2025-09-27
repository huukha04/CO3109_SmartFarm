"use client"
import { useEffect, useState } from "react";
import { useBreadcrumb } from "@/context/breadcrumbContext";

import NotificationList from "./notificationList";
import PaginationWithSelect from "./paginationWithSelect";
import { DateRange } from "react-day-picker";
import { DateRangePicker } from "./dateRangePicker";
import SearchInput from "./searchInput";
import { Label } from "@/components/ui/label";

export type Notification = {
  id: number;
  type: "info" | "warning" | "error";
  title: string;
  message: string;
  time: Date;
};


export default function Page() {
  const { setBreadcrumb } = useBreadcrumb();
  const [loading, setLoading] = useState(true);

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [search, setSearch] = useState("");
  const [filteredNotifications, setFilteredNotifications] = useState<Notification[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);


  // Fetch lần đầu khi component mount
  useEffect(() => {
    setBreadcrumb([{ title: "Thông báo", href: "/notification" }]);
    try {
      setLoading(true);
      const sampleData: Notification[] = [
        { id: 1, type: "info", title: "Thông báo 1", message: "Nội dung thông báo 1", time: new Date() },
        { id: 2, type: "warning", title: "Cảnh báo 2", message: "Nội dung cảnh báo 2", time: new Date() },
        { id: 3, type: "error", title: "Lỗi 3", message: "Nội dung lỗi 3", time: new Date() },
        { id: 4, type: "info", title: "Thông báo 4", message: "Nội dung thông báo 4", time: new Date() },
        { id: 5, type: "warning", title: "Cảnh báo 5", message: "Nội dung cảnh báo 5", time: new Date() },
        { id: 6, type: "error", title: "Lỗi 6", message: "Nội dung lỗi 6", time: new Date() },
        { id: 7, type: "info", title: "Thông báo 7", message: "Nội dung thông báo 7", time: new Date() },
        { id: 8, type: "warning", title: "Cảnh báo 8", message: "Nội dung cảnh báo 8", time: new Date() },
        { id: 9, type: "error", title: "Lỗi 9", message: "Nội dung lỗi 9", time: new Date() },
        { id: 10, type: "info", title: "Thông báo 10", message: "Nội dung thông báo 10", time: new Date() },
      ];

      setNotifications(sampleData);
      setFilteredNotifications(sampleData);
    } catch (error) {
      console.error("Lỗi khi fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  }, [setBreadcrumb]);

  // Refetch khi search, dateRange, itemsPerPage thay đổi
  useEffect(() => {
    // Lọc dữ liệu từ notifications đã fetch
    let filtered = notifications.filter(
      (n) =>
        n.title.toLowerCase().includes(search.toLowerCase()) ||
        n.message.toLowerCase().includes(search.toLowerCase())
    );

    if (dateRange?.from && dateRange.to) {
      filtered = filtered.filter(
        (n) => n.time >= dateRange.from! && n.time <= dateRange.to!
      );
    }

    setFilteredNotifications(filtered);
    setCurrentPage(1);
  }, [search, dateRange, notifications]);

  const paginatedNotifications = filteredNotifications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return <div>Đang tải...</div>;
  }

return (
  <>
    <div className="flex flex-row justify-between items-center px-4">
      <div className="text-2xl font-bold">Danh sách thông báo</div>
    </div>
    
    <div className="p-4">
      <div className="flex flex-col gap-4 p-4">
        {/* Box: Date picker + Search */}
        <div className="flex items-center justify-between w-full p-3 rounded-lg border border-blue-400 dark:border-blue-500 shadow-sm hover:shadow-md transition-shadow">
          {/* Date Picker */}
          <div className="flex-none">
            <DateRangePicker value={dateRange} onChange={setDateRange} />
          </div>

          {/* Search Input nhỏ gọn */}
          <div className="flex flex-col gap-1 w-64">
            <Label className="text-sm font-medium dark:text-gray-200">
              Tìm kiếm:
            </Label>
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Tìm kiếm thông báo..."
            />
          </div>

        </div>

        <NotificationList notifications={paginatedNotifications} />

        <div className="flex flex-col px-4 mt-4 gap-2">
          <PaginationWithSelect
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
          />
        </div>
      </div>
    </div>
  </>
);
}
