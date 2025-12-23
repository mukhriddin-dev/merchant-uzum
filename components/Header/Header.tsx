"use client"

import { LogOut } from "lucide-react"
import { LanguageSwitch } from "@/components/LanguageSwitch/LanguageSwitch"
import type { HeaderProps } from "./type"

export function Header({ language, onLanguageChange, onLogout }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-card/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <span className="text-sm font-bold text-primary-foreground">Uzm</span>
          </div>
          <span className="text-lg font-semibold text-foreground">Merchant Panel</span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <LanguageSwitch value={language} onChange={onLanguageChange} />
          <button
            onClick={onLogout}
            className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            title="Logout"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  )
}
