import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function InsertLocationDialog({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thêm khu vực mới</DialogTitle>
          <DialogDescription>
            Nhập thông tin khu vực mới
          </DialogDescription>
        </DialogHeader>

        {/* Form thêm khu vực */}
        <form className="flex flex-col gap-3 mt-4">
          <input
            type="text"
            placeholder="Tên khu vực"
            className="border rounded-md px-3 py-2"
          />
          <input
            type="text"
            placeholder="Mã khu vực"
            className="border rounded-md px-3 py-2"
          />
          <input
            type="text"
            placeholder="Link ảnh khu vực"
            className="border rounded-md px-3 py-2"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          >
            Lưu
          </button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
