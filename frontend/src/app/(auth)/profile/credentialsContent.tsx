"use client"

import { useSession } from "next-auth/react"
import { Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InfoForm } from "./infoForm"
import { ResetPasswordDialog } from "./resetPasswordDialog"

export function CredentialsContent() {
  const { data: session } = useSession()
  const user = session?.user

  const handleDeleteAccount = () => {
    alert("Xóa tài khoản đã được kích hoạt");
    console.log("Xóa tài khoản đã được kích hoạt")
    // Implement account deletion logic here
  }

  return (
    <Tabs defaultValue="personal" className="space-y-6">
      <TabsList className="grid w-full grid-cols-2 m-0">
        <TabsTrigger value="personal">Thông tin cá nhân</TabsTrigger>
        <TabsTrigger value="security">Bảo mật</TabsTrigger>
      </TabsList>

      {/* Thông tin cá nhân */}
      <TabsContent value="personal" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Thông tin cá nhân</CardTitle>
            <CardDescription>Cập nhật thông tin và hồ sơ của bạn.</CardDescription>
          </CardHeader>
          <CardContent>
            <InfoForm />
          </CardContent>
        </Card>
      </TabsContent>

      {/* Cài đặt bảo mật */}
      <TabsContent value="security" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Cài đặt bảo mật</CardTitle>
            <CardDescription>Quản lý bảo mật tài khoản và xác thực.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {/* Password */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base">Mật khẩu</Label>
                </div>
                <ResetPasswordDialog />
              </div>
              <Separator />

              {/* Số điện thoại bảo mật */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base">Số điện thoại</Label>
                  <p className="text-muted-foreground text-sm">
                    {user?.phone ?? "---"}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  {user?.phone ? "Xóa số" : "Thêm số"}
                </Button>
              </div>
              <Separator />

              {/* Email bảo mật */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base">Email bảo mật</Label>
                  <p className="text-muted-foreground text-sm">
                    {user?.email ?? "---"}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  {user?.email ? "Đổi email" : "Thêm email"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>    

        {/* Danger Zone */}
        <Card className="border-destructive/50">
          <CardHeader>
            <CardTitle className="text-destructive">Khu vực nguy hiểm</CardTitle>
            <CardDescription>Hành động không thể hoàn tác</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base">Xóa tài khoản</Label>
                <p className="text-muted-foreground text-sm">
                  Xóa vĩnh viễn tài khoản và tất cả dữ liệu
                </p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDeleteAccount}
                className="hover:bg-red-700 hover:text-white transition-colors duration-200"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Xóa tài khoản
              </Button>

            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
