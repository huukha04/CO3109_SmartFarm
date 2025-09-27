"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { GithubContent } from "./githubContent";
import { CredentialsContent } from "./credentialsContent";
import ProfileHeader from "./header";
export default function Collapsible() {
  const { data: session, status } = useSession();
  const [provider, setProvider] = useState<"github" | "credentials" | null>(null);

  useEffect(() => {
    if (session?.user?.provider) {
      setProvider(session.user.provider as "github" | "credentials");
    }
  }, [session]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }


return (
  <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
    <div className="w-full max-w-4xl border rounded-xl bg-muted/50 overflow-hidden">
      <div className="space-y-6 px-6 py-10">
        <ProfileHeader />
        {provider === "github" ? <GithubContent /> : <CredentialsContent />}
        {provider ? null : <div>Không tìm thấy provider</div>}
      </div>
    </div>
  </div>
);


}
