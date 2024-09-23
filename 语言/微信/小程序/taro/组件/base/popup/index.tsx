import { View, type BaseEventOrig } from "@tarojs/components"
import styles from "./index.module.scss"
import React, { useEffect, useState, type PropsWithChildren } from "react"
import classNames from "classnames"

interface DavPopupProps {
  className?: string
  show: boolean
  position?: "center" | "left" | "right" | "top" | "bottom"
  overlayStyle?: React.CSSProperties
  duration?: number
  round?: boolean
  closeOnClickOverlay: boolean
  zIndex?: number
  onClose?: () => void
}

export default function DavPopup(props: PropsWithChildren<DavPopupProps>) {
  const containerClass = `${styles["dav-popup"]} ${props.className || ""}`

  const [show, setShow] = useState(props.show)

  useEffect(() => {
    setShow(props.show)
  }, [props.show])

  // 禁止滚动
  const disableScroll = function (e: BaseEventOrig<any>) {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleBackgroundClick = () => {
    if (props.closeOnClickOverlay) {
      setShow(false)
      props.onClose?.()
    }
  }

  return (
    <View
      className={classNames(containerClass, styles.animation)}
      onTouchMove={disableScroll}
      catchMove
      style={{ transitionDuration: `${props.duration}ms`, visibility: show ? "visible" : "hidden", opacity: show ? 1 : 0, zIndex: props.zIndex }}
    >
      <View className={classNames(styles.mask)} onClick={handleBackgroundClick} style={props.overlayStyle} />

      <View
        className={classNames(styles.content, styles[props.position || ""], styles[`${props.position}${show ? "Open" : "Close"}`])}
        style={{
          transitionDuration: `${props.duration}ms`,
          borderRadius: props.round
            ? `
              ${props.position === "bottom" || props.position === "right" || props.position === "center" ? "22.5px" : "0"}
              ${props.position === "bottom" || props.position === "left" || props.position === "center" ? "22.5px" : "0"}
              ${props.position === "top" || props.position === "left" || props.position === "center" ? "22.5px" : "0"}
              ${props.position === "top" || props.position === "right" || props.position === "center" ? "22.5px" : "0"}
            `
            : "",
        }}
      >
        {props.children}
      </View>
    </View>
  )
}

DavPopup.defaultProps = {
  position: "center",
  duration: 300,
  closeOnClickOverlay: true,
  zIndex: 100,
}
