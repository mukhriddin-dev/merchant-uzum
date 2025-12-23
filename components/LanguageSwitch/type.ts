export type Language = "uz" | "ru"

export interface LanguageSwitchProps {
  value: Language
  onChange: (lang: Language) => void
}
