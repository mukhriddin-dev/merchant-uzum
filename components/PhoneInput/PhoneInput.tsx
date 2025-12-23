"use client"

import { useCallback, useRef, type ChangeEvent, type KeyboardEvent } from "react"
import type { PhoneInputProps } from "./type"

export function PhoneInput({ value, onChange, onSubmit, error, disabled }: PhoneInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const formatPhone = useCallback((raw: string): string => {
    const digits = raw.replace(/\D/g, "").slice(0, 9)

    if (digits.length <= 2) return digits
    if (digits.length <= 5) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2, 5)} ${digits.slice(5)}`
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 5)} ${digits.slice(5, 7)} ${digits.slice(7)}`
  }, [])

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/\D/g, "").slice(0, 9)
      onChange(raw)
    },
    [onChange],
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !disabled) {
        e.preventDefault()
        onSubmit(value)
      }
    },
    [value, onSubmit, disabled],
  )

  return (
    <div className="w-full max-w-md">
      <div
        className={`flex items-center gap-2 rounded-full bg-card px-6 py-4 shadow-sm transition-all duration-200 ${
          error ? "ring-2 ring-primary/50" : "focus-within:ring-2 focus-within:ring-primary/30"
        }`}
      >
        <span className="text-lg font-semibold text-foreground">+998</span>
        <input
          ref={inputRef}
          type="tel"
          value={formatPhone(value)}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="(99) 999 99 99"
          disabled={disabled}
          className="flex-1 bg-transparent text-lg font-medium text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-50"
        />
      </div>
      {error && <p className="mt-2 text-center text-sm text-primary">{error}</p>}
    </div>
  )
}
