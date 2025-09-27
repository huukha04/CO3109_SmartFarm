// src/app/(auth)/login/page.tsx
"use client" // thêm nếu muốn cả page là client

import React, { Suspense } from "react"
import { LoginCard } from "./loginCard"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-md">
        <Suspense fallback={<p>Đang tải...</p>}>
          <LoginCard />
        </Suspense>
      </div>
    </div>
  )
}
