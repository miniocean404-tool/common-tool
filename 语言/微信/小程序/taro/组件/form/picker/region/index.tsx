import { View } from "@tarojs/components"
import styles from "./index.module.scss"
import { useEffect, useRef, useState, type PropsWithChildren } from "react"
import type { DavRegionProps } from "./index.d"
import DavPickerStyle from "../picker-style"
import DavPickerBase from "../base"
import { useCascaderAreaData } from "./constant"
const regions = useCascaderAreaData()

export default function DavRegion(props: PropsWithChildren<DavRegionProps>) {
  const containerClass = `${styles["dav-region"]} ${props.className || ""}`

  const [columns, setColumns] = useState<Record<string, any>[][]>([])

  useEffect(() => {
    const province = regions
    const city = regions[0]?.children || []
    const area = city[0].children || []

    setColumns([province, city, area])
  }, [])

  const valueRef = useRef({
    value: "",
    position: 0,
  })

  const onSure = () => {
    props.onSure && props.onSure(valueRef.current.value, valueRef.current.position)
  }

  const onChange = (value, position) => {
    const province = regions
    const city = regions[position[0]]?.children || []
    const area = city[position[1]].children || []

    setColumns([province, city, area])

    valueRef.current = {
      value,
      position,
    }
  }

  return (
    <View className={containerClass}>
      <DavPickerStyle onCancel={props.onCancel} onSure={onSure}>
        <DavPickerBase {...props} columns={columns} onChange={onChange}></DavPickerBase>
      </DavPickerStyle>
    </View>
  )
}
