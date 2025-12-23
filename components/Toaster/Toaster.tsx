"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { X } from "lucide-react"
import type { ToastProps, ToasterContextType } from "./type"

const ToasterContext = createContext<ToasterContextType | undefined>(undefined)

export const useToaster = () => {
  const context = useContext(ToasterContext)
  if (!context) {
    throw new Error("useToaster must be used within ToasterProvider")
  }
  return context
}

export function ToasterProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const showToast = useCallback((message: string, type: ToastProps["type"]) => {
    const id = Date.now().toString()
    setToasts((prev) => [...prev, { id, message, type }])

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4000)
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToasterContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="flex items-center gap-3 rounded-2xl bg-card px-4 py-3 shadow-lg animate-in slide-in-from-right-5 duration-300"
          >
            <div
              className={`h-2 w-2 rounded-full ${
                toast.type === "error" ? "bg-primary" : toast.type === "success" ? "bg-primary" : "bg-primary"
              }`}
            />
            <span className="text-sm font-medium text-card-foreground">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToasterContext.Provider>
  )
}
