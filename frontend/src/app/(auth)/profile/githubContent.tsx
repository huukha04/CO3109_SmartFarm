"use client"

import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"
import { ExternalLink } from "lucide-react"

export function GithubContent() {
  const { data: session } = useSession()
  const githubUrl = session?.user?.name
    ? `https://github.com/${session.user.name}`
    : "https://github.com"

  return (
    <div className="flex flex-col items-center space-y-4">
      <p className="text-muted-foreground">
        Thông tin tài khoản được quản lý trên GitHub.
      </p>
      <Button asChild variant="outline" className="flex items-center gap-2">
        <a href={githubUrl} target="_blank" rel="noopener noreferrer">
          Xem GitHub Profile
          <ExternalLink className="h-4 w-4" />
        </a>
      </Button>
    </div>
  )
}
