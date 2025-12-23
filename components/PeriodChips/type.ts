import type { Language } from "@/components/LanguageSwitch/type"
import type { AvailablePeriod } from "@/lib/schemas"

export interface PeriodChipsProps {
  periods: AvailablePeriod[]
  selectedId: number | null
  onSelect: (id: number) => void
  language: Language
}
