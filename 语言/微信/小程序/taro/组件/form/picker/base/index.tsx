import { PickerView, PickerViewColumn, View, type BaseEventOrig, type PickerViewProps } from "@tarojs/components"
import styles from "./index.module.scss"
import { useEffect, useState, type PropsWithChildren } from "react"
import type { DavPickerBaseProps } from "./index.d"

export default function DavPickerBase(props: PropsWithChildren<DavPickerBaseProps>) {
  const containerClass = `${styles["dav-picker-base"]} ${props.className || ""}`

  const [mode, setMode] = useState<"selector" | "multiSelector">("selector")
  const [index, setIndex] = useState<number[]>()

  useEffect(() => {
    if (props.columns?.every((element) => Array.isArray(element))) {
      setMode("multiSelector")

      if (!props.defaultIndex) {
        setIndex([0, 0])
      } else if (Array.isArray(props.defaultIndex)) {
        setIndex(props.defaultIndex)
      }
    } else {
      setMode("selector")

      if (!props.defaultIndex) {
        setIndex([0])
      } else {
        setIndex(typeof props.defaultIndex === "number" ? [props.defaultIndex] : props.defaultIndex)
      }
    }
  }, [props.defaultIndex])

  useEffect(() => {
    if (index) {
      const { value, position } = getSelected(index)
      props.onChange && props.onChange(value, position)
    }
  }, [index])

  const onChange = (e: BaseEventOrig<PickerViewProps.onChangeEventDetail>) => {
    const changeIndex = e.detail.value
    setIndex(changeIndex)

    const { value, position } = getSelected(changeIndex)
    props.onChange && props.onChange(value, position, e)
  }

  const getSelected = (index: number[]) => {
    let value: string | string[] | Record<string, any> | Record<string, any>[] = ""

    if (mode === "selector") {
      if (!index) {
        value = props.columns[0]
      } else {
        value = props.columns[index[0]]
      }
    }

    if (mode === "multiSelector") {
      if (!index) {
        value = props.columns?.map((column) => column[0])
      } else {
        value = index.map((position, index) => props.columns[index][position])
      }
    }

    const position = mode === "selector" ? index![0] : index!

    return { value, position }
  }

  return (
    <View className={containerClass}>
      <PickerView className={styles["picker-view"]} indicatorClass="indicatorClass" value={index} onChange={onChange} immediateChange>
        {(mode === "selector" ? [props.columns] : props.columns).map((column, index) => {
          return (
            <PickerViewColumn key={index}>
              {Array.isArray(column) &&
                column?.map((option, oIndex) => {
                  return <View key={oIndex}>{props.columnKey && typeof column[0] === "object" ? option[props.columnKey] : option}</View>
                })}
            </PickerViewColumn>
          )
        })}
      </PickerView>
    </View>
  )
}

DavPickerBase.defaultProps = {
  columnKey: "key",
  columnValue: "value",
}
