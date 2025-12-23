"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Eye, EyeOff } from "lucide-react"
import { loginSchema, type LoginFormData } from "@/lib/validation"
import { login } from "@/lib/auth"
import { useToaster } from "@/components/Toaster/Toaster"

export default function LoginPage() {
  const router = useRouter()
  const { showToast } = useToaster()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)

    // Simulate a brief delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 300))

    const success = login(data.username, data.password)

    if (success) {
      showToast("Login successful", "success")
      router.push("/panel")
    } else {
      showToast("Invalid credentials", "error")
    }

    setIsLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
            <span className="text-2xl font-bold text-primary-foreground">Uzm</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Merchant Panel</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to continue</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username */}
          <div>
            <input
              {...register("username")}
              type="text"
              placeholder="Username"
              autoComplete="username"
              className={`w-full rounded-2xl bg-card px-4 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${
                errors.username ? "ring-2 ring-primary/50" : ""
              }`}
            />
            {errors.username && <p className="mt-2 px-2 text-sm text-primary">{errors.username.message}</p>}
          </div>

          {/* Password */}
          <div>
            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                autoComplete="current-password"
                className={`w-full rounded-2xl bg-card px-4 py-4 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${
                  errors.password ? "ring-2 ring-primary/50" : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && <p className="mt-2 px-2 text-sm text-primary">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-full bg-primary py-4 text-base font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  )
}
