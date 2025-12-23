"use client"

import type { LanguageSwitchProps, Language } from "./type"

export function LanguageSwitch({ value, onChange }: LanguageSwitchProps) {
  const options: { label: string; value: Language }[] = [
    { label: "UZ", value: "uz" },
    { label: "RU", value: "ru" },
  ]

  return (
    <div className="flex rounded-full bg-muted p-1">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-200 ${
            value === option.value
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
