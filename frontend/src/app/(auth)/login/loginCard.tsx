"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

import { LoginForm } from "./loginForm"
import { LoginGithubButton } from "./loginGithubButton"
import { AlertDemo } from "./alertDemo"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function LoginCard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Chào mừng trở lại</CardTitle>
          <CardDescription>
            Đăng nhập bằng tài khoản Github
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-4 mb-6">
            {/* Button Github */}
            <LoginGithubButton />

            {/* Separator */}
            <div className="relative text-center text-sm">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border"></span>
              </div>
              <span className="relative z-10 bg-card px-2 text-muted-foreground">
                Hoặc đăng nhập với
              </span>
            </div>

            {/* Alert login info */}
            <AlertDemo />

            {/* Form login */}
            <LoginForm />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
