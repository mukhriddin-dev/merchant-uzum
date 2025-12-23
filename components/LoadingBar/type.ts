export type LoadingBarStatus = "idle" | "loading" | "success" | "error"

export interface LoadingBarProps {
  status: LoadingBarStatus
}
