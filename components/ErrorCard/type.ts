import type { Language } from "@/components/LanguageSwitch/type"

export interface ErrorCardProps {
  message: string
  language: Language
  onRetry: () => void
}
