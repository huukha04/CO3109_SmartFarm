import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function InsertDeviceDialog({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý logic lưu thiết bị mới ở đây
    onClose(); // Đóng dialog sau khi lưu
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thêm thiết bị mới</DialogTitle>
          <DialogDescription>
            Nhập thông tin thiết bị mới
          </DialogDescription>
        </DialogHeader>

        <Separator />

        {/* Form thêm thiết bị */}
        <form className="space-y-5 px-2" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="deviceType" className="font-medium">
              Loại thiết bị
            </Label>
            <Input
              type="text"
              placeholder="Tên thiết bị"
              className="border rounded-md px-3 py-2"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="deviceCode" className="font-medium">
              Mã thiết bị
            </Label>
            <Input
              type="text"
              placeholder="Mã thiết bị"
              className="border rounded-md px-3 py-2"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="deviceImage" className="font-medium">
              Link ảnh thiết bị
            </Label>
            <Input
              type="text"
              placeholder="Link ảnh thiết bị"
              className="border rounded-md px-3 py-2"
            />
          </div>

          <div className="flex gap-2 ">
            <Button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Lưu
            </Button>
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="px-4 py-2 rounded-md bg-amber-500 text-white hover:bg-amber-600"
              >
                Hủy
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
