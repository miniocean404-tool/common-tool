export interface DavPickerStyleProps {
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
  title?: string
  sureText?: string
  cancelText?: string
  onSure?: () => void
  onCancel?: () => void
}
