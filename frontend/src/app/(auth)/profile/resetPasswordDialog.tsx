import { Key } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { DialogClose, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ResetPasswordDialog() {

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">
          <Key className="mr-2 h-4 w-4" />
          Change Password
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Đổi mật khẩu</DialogTitle>
          <DialogDescription>Vui lòng nhập đầu đủ thông tin để đổi mật khẩu.</DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
          <div className="grid gap-4">
          <div className="grid gap-3">
              <Label htmlFor="oldPassword">Old Password</Label>
              <Input id="oldPassword" name="oldPassword" type="password" />
          </div>
          <div className="grid gap-3">
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" name="newPassword" type="password" />
          </div>
          </div>
        </form>
        <DialogFooter className="sm:justify-start">
          <Button type="submit">Save Changes</Button>
          <DialogClose asChild>
          <Button type="button" variant="secondary">
              Close
          </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
