import { View } from "@tarojs/components"
import { useEffect, useRef, type PropsWithChildren } from "react"
import type { DavPickerProps } from "./index.d"
import DavPickerStyle from "../picker-style"
import DavPickerBase from "../base"
import styles from "./index.module.scss"

export default function DavPicker(props: PropsWithChildren<DavPickerProps>) {
  const containerClass = `${styles["dav-index"]} ${props.className || ""}`

  const valueRef = useRef({
    value: "",
    position: 0,
  })

  useEffect(() => {}, [])

  const onSure = () => {
    props.onSure && props.onSure(valueRef.current.value, valueRef.current.position)
  }

  const onChange = (value, position) => {
    valueRef.current = {
      value,
      position,
    }
  }

  return (
    <View className={containerClass}>
      <DavPickerStyle {...props} onCancel={props.onCancel} onSure={onSure}>
        <DavPickerBase {...props} onChange={onChange}></DavPickerBase>
      </DavPickerStyle>
    </View>
  )
}
