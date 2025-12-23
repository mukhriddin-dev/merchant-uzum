export interface PhoneInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: (phone: string) => void
  error?: string
  disabled?: boolean
}
