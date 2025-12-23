"use client"

import { useMutation } from "@tanstack/react-query"
import apiClient from "@/lib/axios"
import type { AxiosError } from "axios"

export interface AvailablePeriod {
  id: number
  name_uz: string
  name_ru: string
  markup_percentage: number
  available_balance: number
}

export interface BuyerData {
  id: number
  phone: string
  status: number
  status_label: string
  status_explanation: string
  verified_at: string | null
  balance: number
  has_limit: boolean
  custom_discount: number | null
  has_overdue_contracts: boolean
  is_blacklisted: boolean
  blacklist_reason: string | null
  available_periods: AvailablePeriod[]
  webview_url: string | null
}

export interface ApiSuccessResponse {
  status: "success"
  data: BuyerData
}

export interface ApiErrorResponse {
  status: "error"
  error?: Array<{ type: string; text: string }>
  errors?: Array<{ type: string; text: string }>
  message?: string
}

type ApiResponse = ApiSuccessResponse | ApiErrorResponse

const checkBuyerStatus = async (phone: string): Promise<ApiResponse> => {
  const formattedPhone = `998${phone}`
  const response = await apiClient.post<ApiResponse>("/buyers/check-status", {
    phone: formattedPhone,
  })
  return response.data
}

export const useCheckBuyerStatus = () => {
  const mutation = useMutation<ApiResponse, AxiosError<ApiErrorResponse>, string>({
    mutationFn: checkBuyerStatus,
  })

  const fetchBuyerStatus = async (phone: string) => {
    return mutation.mutateAsync(phone)
  }

  const reset = () => {
    mutation.reset()
  }

  const data = mutation.data?.status === "success" ? mutation.data : null
  const isSuccess = mutation.isSuccess && mutation.data?.status === "success"
  const isError = mutation.isError || (mutation.isSuccess && mutation.data?.status === "error")

  let errorMessages: string[] = []
  if (mutation.isError) {
    const axiosError = mutation.error
    if (axiosError.response?.data) {
      const errData = axiosError.response.data
      const errArray = errData.error || errData.errors || []
      errorMessages = errArray.map((e) => e.text)
      if (errorMessages.length === 0 && errData.message) {
        errorMessages = [errData.message]
      }
    } else {
      errorMessages = [axiosError.message || "Network error"]
    }
  } else if (mutation.data?.status === "error") {
    const errData = mutation.data as ApiErrorResponse
    const errArray = errData.error || errData.errors || []
    errorMessages = errArray.map((e) => e.text)
    if (errorMessages.length === 0 && errData.message) {
      errorMessages = [errData.message]
    }
  }

  return {
    data: data?.data || null,
    error: errorMessages.length > 0 ? errorMessages : null,
    isLoading: mutation.isPending,
    isError,
    isSuccess,
    fetchBuyerStatus,
    reset,
  }
}
