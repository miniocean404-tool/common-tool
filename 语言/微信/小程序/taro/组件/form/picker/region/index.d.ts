import { DavPickerBaseProps } from "../base/index.d"

export type DavRegionProps = Omit<DavPickerBaseProps, "onSure" | "style" | "columns"> & Props

interface Props {
  onCancel?: () => void
  onSure?: (value: string | Record<string, any> | string[] | Record<string, any>[], position: number | number[]) => void
}
