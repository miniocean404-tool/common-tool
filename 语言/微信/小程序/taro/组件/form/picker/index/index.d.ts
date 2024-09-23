import type { DavPickerStyleProps } from "../picker-style/index.d"
import { DavPickerBaseProps } from "../base/index.d"

export type DavPickerProps = Omit<DavPickerStyleProps, "onSure" | "style"> & Props

interface Props extends DavPickerBaseProps {
  onSure?: (value: string | Record<string, any> | string[] | Record<string, any>[], position: number | number[]) => void
  onCancel?: () => void
}
