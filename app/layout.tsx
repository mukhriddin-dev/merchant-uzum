import type React from "react"
import type { Metadata } from "next"
import { Providers } from "@/components/Providers/Providers"
import "./globals.css"

export const metadata: Metadata = {
  title: "Buyer Status Panel",
  description: "Check buyer status and manage transactions",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
