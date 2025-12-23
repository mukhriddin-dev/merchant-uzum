export interface ToastProps {
  id: string
  message: string
  type: "success" | "error" | "info"
}

export interface ToasterContextType {
  toasts: ToastProps[]
  showToast: (message: string, type: ToastProps["type"]) => void
  removeToast: (id: string) => void
}
