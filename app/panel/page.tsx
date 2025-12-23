"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import { isAuthenticated, logout } from "@/lib/auth"
import { useCheckBuyerStatus } from "@/hooks/useCheckBuyerStatus"
import { useToaster } from "@/components/Toaster/Toaster"
import { phoneSchema } from "@/lib/validation"
import { Header } from "@/components/Header/Header"
import { Footer } from "@/components/Footer/Footer"
import { SearchRow } from "@/components/SearchRow/SearchRow"
import { DataCard } from "@/components/DataCard/DataCard"
import { ErrorCard } from "@/components/ErrorCard/ErrorCard"
import { DataCardSkeleton } from "@/components/Skeleton/Skeleton"
import { LoadingBar } from "@/components/LoadingBar/LoadingBar"
import type { LoadingBarStatus } from "@/components/LoadingBar/type"
import type { Language } from "@/components/LanguageSwitch/type"

export default function PanelPage() {
  const router = useRouter()
  const { showToast } = useToaster()
  const { isLoading, isError, isSuccess, data, error, fetchBuyerStatus, reset } = useCheckBuyerStatus()
  const [language, setLanguage] = useState<Language>("uz")
  const [phone, setPhone] = useState("")
  const [authChecked, setAuthChecked] = useState(false)
  const [loadingStatus, setLoadingStatus] = useState<LoadingBarStatus>("idle")
  const isSubmittingRef = useRef(false)

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login")
    } else {
      setAuthChecked(true)
    }
  }, [router])

  useEffect(() => {
    if (isLoading) {
      setLoadingStatus("loading")
    } else if (isError) {
      setLoadingStatus("error")
    } else if (isSuccess) {
      setLoadingStatus("success")
    }
  }, [isLoading, isError, isSuccess])

  useEffect(() => {
    if (isError && error) {
      const message = Array.isArray(error) ? error.join(", ") : error
      showToast(message, "error")
    }
  }, [isError, error, showToast])

  const isPhoneValid = phone.length === 9

  const handlePhoneSubmit = useCallback(
    async (internalPhone: string) => {
      if (isLoading || isSubmittingRef.current) return

      try {
        await phoneSchema.validate({ phone: internalPhone })

        isSubmittingRef.current = true

        await fetchBuyerStatus(internalPhone)
      } catch (err) {
        if (err instanceof Error) {
          showToast(err.message, "error")
        }
        setLoadingStatus("error")
      } finally {
        isSubmittingRef.current = false
      }
    },
    [isLoading, showToast, fetchBuyerStatus],
  )

  const handlePhoneChange = useCallback(
    (value: string) => {
      setPhone(value)
      setLoadingStatus("idle")
      reset()
    },
    [reset],
  )

  const handleCopy = useCallback(
    (text: string, label: string) => {
      navigator.clipboard.writeText(text)
      showToast(`${label} copied`, "success")
    },
    [showToast],
  )

  const handleOpenWebview = useCallback((url: string) => {
    window.open(url, "_blank")
  }, [])

  const handleReset = useCallback(() => {
    setPhone("")
    setLoadingStatus("idle")
    reset()
  }, [reset])

  const handleLogout = useCallback(() => {
    logout()
    router.push("/login")
  }, [router])

  const handleRetry = useCallback(() => {
    if (phone.length === 9) {
      handlePhoneSubmit(phone)
    }
  }, [phone, handlePhoneSubmit])

  if (!authChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LoadingBar status={loadingStatus} />
      <Header language={language} onLanguageChange={setLanguage} onLogout={handleLogout} />

      <main className="flex flex-1 flex-col items-center px-6 py-12">
        <div className="w-full max-w-4xl">
          <SearchRow
            value={phone}
            onChange={handlePhoneChange}
            onSubmit={handlePhoneSubmit}
            disabled={isLoading}
            isValid={isPhoneValid}
          />
        </div>

        <div className="mt-8 w-full max-w-[1150px]">
          {isLoading && <DataCardSkeleton />}

          {!isLoading && isError && (
            <ErrorCard
              message={Array.isArray(error) ? error.join(", ") : "Failed to fetch buyer status"}
              language={language}
              onRetry={handleRetry}
            />
          )}

          {!isLoading && !isError && isSuccess && data && (
            <DataCard
              data={data}
              language={language}
              onCopy={handleCopy}
              onOpenWebview={handleOpenWebview}
              onReset={handleReset}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
