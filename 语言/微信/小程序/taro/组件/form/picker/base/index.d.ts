import type { BaseEventOrig, PickerViewProps } from "@tarojs/components"

interface DavPickerBaseProps {
  className?: string
  columnKey?: string
  columnValue?: string
  show?: boolean
  defaultIndex?: number | number[]
  columns: string[] | Record<string, any>[] | string[][] | Record<string, any>[][]
  onChange?: (
    value: string | string[] | Record<string, any> | Record<string, any>[],
    position: number | number[],
    e?: BaseEventOrig<PickerViewProps.onChangeEventDetail>,
  ) => void
}
