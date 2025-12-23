const AUTH_KEY = "buyer_panel_auth"

export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false
  return localStorage.getItem(AUTH_KEY) === "true"
}

export const login = (username: string, password: string): boolean => {
  const envUsername = process.env.NEXT_PUBLIC_LOGIN_USERNAME
  const envPassword = process.env.NEXT_PUBLIC_LOGIN_PASSWORD

  if (username === envUsername && password === envPassword) {
    localStorage.setItem(AUTH_KEY, "true")
    return true
  }
  return false
}

export const logout = (): void => {
  localStorage.removeItem(AUTH_KEY)
}
