"use client"

import { useCallback, useRef, type ChangeEvent, type KeyboardEvent } from "react"
import type { SearchRowProps } from "./type"

function formatPhoneDisplay(digits: string): string {
  if (!digits) return ""
  // Format: XX XXX XX XX
  const parts: string[] = []
  if (digits.length > 0) parts.push(digits.slice(0, 2))
  if (digits.length > 2) parts.push(digits.slice(2, 5))
  if (digits.length > 5) parts.push(digits.slice(5, 7))
  if (digits.length > 7) parts.push(digits.slice(7, 9))
  return parts.join(" ")
}

export function SearchRow({ value, onChange, onSubmit, disabled, isValid }: SearchRowProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      // Remove all non-digits and limit to 9
      const raw = e.target.value.replace(/\D/g, "").slice(0, 9)
      onChange(raw)
    },
    [onChange],
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !disabled && isValid) {
        e.preventDefault()
        onSubmit(value) // Pass only 9 digits, panel will prepend 998
      }
    },
    [value, onSubmit, disabled, isValid],
  )

  const handleButtonClick = useCallback(() => {
    if (!disabled && isValid) {
      onSubmit(value) // Pass only 9 digits, panel will prepend 998
    }
  }, [value, onSubmit, disabled, isValid])

  return (
    <div className="flex w-full items-center justify-between gap-6">
      {/* Left: Title and Subtitle */}
      <div className="flex-shrink-0">
        <h1 className="text-xl font-bold text-foreground">Holati</h1>
        <p className="text-sm text-muted-foreground">Mijozning holatini tekshiring</p>
      </div>

      {/* Center: Phone Input + Button container */}
      <div className="flex flex-1 items-center justify-center">
        <div className="flex items-center gap-[5px]">
          <div className="flex h-14 w-80 items-center rounded-[16px] border border-foreground bg-background px-5">
            {/* Fixed non-editable prefix */}
            <span className="text-lg font-medium text-foreground select-none">+998</span>
            <input
              ref={inputRef}
              type="tel"
              inputMode="numeric"
              value={formatPhoneDisplay(value)}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              disabled={disabled}
              placeholder="00 000 00 00"
              className="ml-2 flex-1 bg-transparent text-lg font-medium text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-50"
            />
          </div>

          {/* Submit Button - same height as input, 5px gap */}
          <button
            type="button"
            onClick={handleButtonClick}
            disabled={disabled || !isValid}
            className="h-14 flex-shrink-0 rounded-[16px] px-6 text-base font-semibold text-white transition-colors disabled:cursor-not-allowed"
            style={{
              backgroundColor: isValid && !disabled ? "#6D32FF" : "#9CA3AF",
            }}
          >
            Tekshirish
          </button>
        </div>
      </div>

      {/* Empty div to balance the layout */}
      <div className="flex-shrink-0 w-[140px]" />
    </div>
  )
}
