"use client"

import { AlertCircle, RotateCcw } from "lucide-react"
import type { ErrorCardProps } from "./type"

export function ErrorCard({ message, language, onRetry }: ErrorCardProps) {
  const labels = {
    uz: { retry: "Qaytadan urinish" },
    ru: { retry: "Попробовать снова" },
  }

  return (
    <div className="w-full max-w-md rounded-[20px] bg-card p-6 shadow-sm">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="rounded-full bg-primary/10 p-3">
          <AlertCircle className="h-6 w-6 text-primary" />
        </div>
        <p className="text-sm text-muted-foreground">{message}</p>
        <button
          onClick={onRetry}
          className="flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
        >
          <RotateCcw className="h-4 w-4" />
          {labels[language].retry}
        </button>
      </div>
    </div>
  )
}
