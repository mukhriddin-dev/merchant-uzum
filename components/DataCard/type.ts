import type { Language } from "@/components/LanguageSwitch/type"
import type { BuyerData, AvailablePeriod } from "@/hooks/useCheckBuyerStatus"

export type { BuyerData, AvailablePeriod }

export interface DataCardProps {
  data: BuyerData
  language: Language
  onCopy: (text: string, label: string) => void
  onOpenWebview: (url: string) => void
  onReset: () => void
}
