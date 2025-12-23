"use client"

import type { PeriodChipsProps } from "./type"

export function PeriodChips({ periods, selectedId, onSelect, language }: PeriodChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {periods.map((period) => (
        <button
          key={period.id}
          onClick={() => onSelect(period.id)}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
            selectedId === period.id
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          {language === "uz" ? period.name_uz : period.name_ru}
        </button>
      ))}
    </div>
  )
}
