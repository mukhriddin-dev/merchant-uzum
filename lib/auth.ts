export const AUTH_KEY = "buyer_panel_auth";

export const setCookie = (name: string, value: string, days = 1) => {
  const expires = new Date(
    Date.now() + days * 24 * 60 * 60 * 1000
  ).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${expires}; path=/; SameSite=Lax`;
};

export const getCookie = (name: string) => {
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="));
  return match ? decodeURIComponent(match.split("=")[1]) : null;
};

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; Max-Age=0; path=/`;
};

export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(AUTH_KEY) === "true";
};

export const login = (username: string, password: string): boolean => {
  const envUsername = process.env.NEXT_PUBLIC_LOGIN_USERNAME;
  const envPassword = process.env.NEXT_PUBLIC_LOGIN_PASSWORD;

  if (username === envUsername && password === envPassword) {
    localStorage.setItem(AUTH_KEY, "true");
    setCookie(AUTH_KEY, "true", 7);
    return true;
  }
  return false;
};

export const logout = (): void => {
  localStorage.removeItem(AUTH_KEY);
};
