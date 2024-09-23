import { DavPickerStyleProps } from "../picker-style/index.d"

export type DateTimeProps = Omit<DavPickerStyleProps, "onSure" | "style"> & Props

interface Props {
  className?: string
  show?: boolean
  type: "date" | "time" | "gapTime"
  gap?: number
  onSure?: (value: string | Record<string, any> | string[] | Record<string, any>[], position: number | number[]) => void
}
