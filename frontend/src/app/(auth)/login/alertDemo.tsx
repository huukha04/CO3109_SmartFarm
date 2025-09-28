"use client"
import { AlertCircleIcon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function AlertDemo() {
  return (
    <div className="grid w-full max-w-xl items-start gap-4">
      <Alert variant="destructive">
        <AlertCircleIcon className="h-5 w-5 text-red-500" />
        <div className="ml-2">
          <AlertTitle className="font-medium">Thông tin đăng nhập</AlertTitle>
          <AlertDescription>
            <p>Bạn có thể đăng nhập bằng:</p>
            <ul className="list-inside list-disc text-sm">
              <li>Tên đăng nhập: toolpad-demo</li>
              <li>Mật khẩu: @demo1</li>
            </ul>
          </AlertDescription>
        </div>
      </Alert>
    </div>
  )
}
