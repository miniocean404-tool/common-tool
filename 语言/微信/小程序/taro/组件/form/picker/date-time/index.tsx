import { View, type BaseEventOrig, type PickerViewProps } from "@tarojs/components"
import styles from "./index.module.scss"
import { useEffect, useRef, useState, type PropsWithChildren } from "react"
import { DateTimeProps } from "./index.d"
import { getDateRange, getTimeGapRange, getTimeRange } from "./utils"
import { MIN_YEAR } from "./constant"
import DavPickerBase from "../base"
import DavPickerStyle from "../picker-style"

export default function DavDateTime(props: PropsWithChildren<DateTimeProps>) {
  const containerClass = `${styles["dav-datetime"]} ${props.className || ""}`

  const [columns, setColumns] = useState<Record<string, any>[]>([])
  const [index, setIndex] = useState<number[] | number>([])

  const valueRef = useRef<{ value: string | Record<string, any>; position: number }>({
    value: "",
    position: 0,
  })

  useEffect(() => {
    const now = new Date()
    // 设置默认今天
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const day = now.getDate()
    // 设置默认现在
    const hours = now.getHours()
    const minute = now.getMinutes()

    if (props.type === "date") {
      const { yearRange, mouthRange, dayRange } = getDateRange(year, month)
      setColumns([yearRange, mouthRange, dayRange])
      setIndex([year - MIN_YEAR, month - 1, day - 1])
    }

    if (props.type === "time") {
      const { hoursRange, minuteRange } = getTimeRange()
      setColumns([hoursRange, minuteRange])
      setIndex([hours, minute])
    }

    if (props.type === "gapTime") {
      const columns = getTimeGapRange(props.gap)
      setColumns(columns)
      if (minute >= 30) {
        setIndex(hours * 2 + 1)
      } else {
        setIndex(hours * 2)
      }
    }
  }, [])

  // 处理时间选择范围
  const onChange = (value, position, _: BaseEventOrig<PickerViewProps.onChangeEventDetail>) => {
    valueRef.current = {
      value,
      position,
    }

    if (props.type === "date" && value.length > 0) {
      const { yearRange, mouthRange, dayRange } = getDateRange(Number(value[0]["value"]), Number(value[1]["value"]))
      setColumns([yearRange, mouthRange, dayRange])
    }
  }

  const onSure = () => {
    if ((props.type === "date" || props.type === "time") && Array.isArray(valueRef.current.value)) {
      valueRef.current.value = { key: valueRef.current.value.map((item) => item.key), value: valueRef.current.value.map((item) => item.value) }
    }

    props.onSure && props.onSure(valueRef.current.value, valueRef.current.position)
  }

  const onCancel = () => {
    props.onCancel && props.onCancel()
  }

  return (
    <View className={containerClass}>
      <DavPickerStyle {...props} onSure={onSure} onCancel={onCancel}>
        <DavPickerBase columns={columns} defaultIndex={index} onChange={onChange}></DavPickerBase>
      </DavPickerStyle>
    </View>
  )
}

DavDateTime.defaultProps = {
  gap: 30,
}
