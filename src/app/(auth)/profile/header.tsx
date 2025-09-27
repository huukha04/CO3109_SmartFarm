"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Mail, ArrowLeft } from "lucide-react";

export default function ProfileHeader() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  if (status === "loading") {
    return <p className="p-4">Loading...</p>;
  }

  const user = session?.user;

  const name = user?.name ?? "---";
  const email = user?.email ?? "---";
  const image = user?.image ?? undefined;
  const provider = (user as unknown as Record<string, unknown>)?.provider as string ?? "---";

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-row items-center gap-6 flex-nowrap">
          {/* Avatar */}
          <div className="relative shrink-0">
            <Avatar className="h-12 w-12 lg:h-16 lg:w-16">
              <AvatarImage
                src={
                  image ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    name !== "---" ? name : "User"
                  )}&background=0D8ABC&color=fff`
                }
                alt="Profile"
              />
              <AvatarFallback className="text-xl">
                {name !== "---" ? name.charAt(0).toUpperCase() : "?"}
              </AvatarFallback>
            </Avatar>

            <Button
              size="icon"
              variant="outline"
              className="absolute -right-2 -bottom-2 h-8 w-8 rounded-full"
            >
              <Camera />
            </Button>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex flex-row items-center gap-2">
              <h1 className="truncate text-2xl font-bold max-w-[200px] lg:max-w-[300px]">
                {name}
              </h1>
              <Badge variant="secondary" className="shrink-0">
                {provider}
              </Badge>
            </div>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1 min-w-0">
                <Mail className="size-4 shrink-0" />
                <span className="truncate max-w-[250px] lg:max-w-[400px]">
                  {email}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex shrink-0 flex-col gap-2 md:flex-row md:items-center">
            <Button
              variant="outline"
              onClick={() => router.push(callbackUrl)}
              className="flex items-center gap-1"
            >
              <ArrowLeft size={16} />
              Back
            </Button>
            <Button
              variant="default"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
