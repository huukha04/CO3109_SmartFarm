"use client"
import * as React from "react"
import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { AlertError } from "@/components/alertError"

export function LoginForm({ className, ...props }: React.ComponentProps<"form">) {
  const searchParams = useSearchParams()
  const [error, setError] = React.useState<string | null>(null)

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    const form = event.currentTarget
    const formData = new FormData(form)

    const res = await signIn("credentials", {
      redirect: false,
      username: formData.get("username"),
      password: formData.get("password"),
    })

    if (res?.error) {
      if (res.error === "CredentialsSignin") setError("Tên đăng nhập hoặc mật khẩu không đúng")
      else setError(`${res.error}: Đã xảy ra lỗi. Vui lòng thử lại sau.`)
    } else {
      const callbackUrl = searchParams.get("callbackUrl") || "/"
      window.location.href = callbackUrl
    }
  }

  return (
    <form onSubmit={handleLogin} className={className} {...props}>
      <div className="grid gap-6">
        <div className="grid gap-6">
          {/* Username */}
          <div className="grid gap-3">
            <Label htmlFor="username">Tên đăng nhập</Label>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="toolpad-demo"
              required
            />
          </div>

          {/* Password */}
          <div className="grid gap-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Mật khẩu</Label>
              {/* <a href="#" className="text-sm underline-offset-4 hover:underline">Quên mật khẩu?</a> */}
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Error alert */}
          {error && <AlertError>{error}</AlertError>}

          {/* Submit button */}
          <Button type="submit" className="w-full">
            Tiếp tục
          </Button>
        </div>

        {/* Terms */}
        <div className="text-muted-foreground text-center text-xs">
          Bằng cách nhấn &quot;Tiếp tục&quot;, bạn đồng ý với <a className="text-blue-600" href="./register">Điều khoản dịch vụ</a> và <a className="text-blue-600" href="#">Chính sách bảo mật</a>.
        </div>
      </div>
    </form>
  )
}
