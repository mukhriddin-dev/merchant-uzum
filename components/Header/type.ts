import type { Language } from "@/components/LanguageSwitch/type"

export interface HeaderProps {
  language: Language
  onLanguageChange: (lang: Language) => void
  onLogout: () => void
}
