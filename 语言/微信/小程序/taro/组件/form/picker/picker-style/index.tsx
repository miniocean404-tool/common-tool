import { View, Text } from "@tarojs/components"
import styles from "./index.module.scss"
import type { PropsWithChildren } from "react"
import DavButton from "@/components/common/base/button"
import type { DavPickerStyleProps } from "./index.d"

export default function DavPickerStyle(props: PropsWithChildren<DavPickerStyleProps>) {
  const { className, title, cancelText, sureText, children, onSure, onCancel } = props
  const containerClass = `${styles["dav-popup"]} ${className || ""}`

  return (
    <View className={containerClass}>
      <View className={styles["mask-select-container"]}>
        {/* 标题 */}
        <Text className={styles["mask-title"]}>{title}</Text>

        {/* 弹窗框显示内容 */}
        <View className={styles["mask-content-container"]}>{children}</View>

        {/* 按钮组 */}
        <View className={styles["button-group"]}>
          <DavButton className={styles["button-group-left"]} onClick={onCancel}>
            {cancelText}
          </DavButton>

          <DavButton className={styles["button-group-right"]} onClick={onSure}>
            {sureText}
          </DavButton>
        </View>
      </View>
    </View>
  )
}

DavPickerStyle.defaultProps = {
  className: "",
  title: "请选择",
  sureText: "确定",
  cancelText: "取消",
}
