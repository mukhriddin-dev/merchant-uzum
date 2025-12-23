export interface SearchRowProps {
  value: string
  onChange: (value: string) => void
  onSubmit: (phone: string) => void
  disabled?: boolean
  isValid: boolean
}
