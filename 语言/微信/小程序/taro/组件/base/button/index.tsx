import "./native.scss"
import styles from "./index.module.scss"

import { Button, ButtonProps, CommonEventFunction, Text, TouchEventFunction } from "@tarojs/components"
import { PropsWithChildren, useEffect, useState } from "react"
import { getEmitter } from "@/utils/emitter"

const emitter = getEmitter()

interface DavButtonProps {
  children?: React.ReactNode
  className?: string
  theme?: "light"
  onClick?: TouchEventFunction
  onGetPhoneNumber?: CommonEventFunction<ButtonProps.onGetPhoneNumberEventDetail>
  isCheckPhone?: boolean
  shadow?: boolean
  disable?: boolean
  openType?: ButtonProps.OpenType
}

export default function DavButton({
  className,
  theme,
  onClick,
  children,
  onGetPhoneNumber,
  isCheckPhone,
  shadow = false,
  disable = false,
  openType,
}: PropsWithChildren<DavButtonProps>) {
  const containerClass = `button-native ${styles["dav-button"]} ${className} ${shadow && styles["dav-shadow-button"]} ${styles[theme || ""]}`

  const [innerDisabled, setInnerDisabled] = useState(disable)

  useEffect(() => {
    setInnerDisabled(disable)
  }, [disable])

  useEffect(() => {
    if (isCheckPhone) {
      emitter.on("check-phone", (arg) => setInnerDisabled(!arg))
      emitter.emit("start-check-phone", true)
    }
  }, [])

  return (
    <>
      <Button className={containerClass} onClick={onClick} openType={openType} onGetPhoneNumber={onGetPhoneNumber} disabled={innerDisabled}>
        <Text className="text">{children}</Text>
      </Button>
    </>
  )
}
