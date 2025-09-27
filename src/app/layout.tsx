// src/app/layout.tsx
import type { Metadata } from "next";
import "@/style/tailwind.css";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "Smart Farm",
  description: "Smart Farm Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            {children} {/* Nội dung các layout con (main, auth, ...) */}
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
