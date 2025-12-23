"use client"

import { useEffect, useState } from "react"
import type { LoadingBarProps, LoadingBarStatus } from "./type"

const STATUS_COLORS: Record<LoadingBarStatus, string> = {
  idle: "transparent",
  loading: "#6D32FF",
  success: "#22C55E",
  error: "#EF4444",
}

export function LoadingBar({ status }: LoadingBarProps) {
  const [visible, setVisible] = useState(false)
  const [currentStatus, setCurrentStatus] = useState<LoadingBarStatus>("idle")

  useEffect(() => {
    if (status === "loading") {
      setVisible(true)
      setCurrentStatus("loading")
    } else if (status === "success" || status === "error") {
      setCurrentStatus(status)
      // Hide after brief delay
      const timer = setTimeout(() => {
        setVisible(false)
        setCurrentStatus("idle")
      }, 800)
      return () => clearTimeout(timer)
    } else {
      setVisible(false)
      setCurrentStatus("idle")
    }
  }, [status])

  if (!visible) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px] overflow-hidden">
      <div
        className="h-full transition-all duration-300"
        style={{
          backgroundColor: STATUS_COLORS[currentStatus],
          width: currentStatus === "loading" ? "100%" : "100%",
          animation: currentStatus === "loading" ? "loadingProgress 1.5s ease-in-out infinite" : "none",
        }}
      />
      <style jsx>{`
        @keyframes loadingProgress {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  )
}
