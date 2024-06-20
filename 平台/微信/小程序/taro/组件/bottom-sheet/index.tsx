import { MovableArea, MovableView, View, type ITouchEvent } from "@tarojs/components"

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type FC,
  type ForwardedRef,
  type PropsWithChildren,
} from "react"
import styles from "./index.module.scss"
import { pxTransform } from "@tarojs/taro"
import { getSystemInfoSync } from "@tarojs/taro"

interface DavBottomSheetProps {
  className?: string

  slotClass?: string
  showMask?: boolean

  initHeight?: number
  fullHeight: number

  damping?: number

  parentRef?: ForwardedRef<DavBottomSheetRef>
}

export interface DavBottomSheetRef {
  toggle: () => void
}

const CardStatePostion = {
  expand: -100000,
  close: 0,
}

enum CardState {
  Expand = "expand",
  Close = "close",
}

const DavBottomSheet: FC<PropsWithChildren<DavBottomSheetProps>> = ({
  className,
  showMask,
  children,
  initHeight,
  fullHeight,
  damping,
  parentRef,
}) => {
  const [cardState, setCardState] = useState(CardState.Close)
  const cardStateRef = useRef({ y: 0 })

  const windowHeight = getSystemInfoSync().windowHeight
  const cardHeight = (fullHeight && pxTransform(fullHeight)) || windowHeight * (4 / 5)

  const touchStart = (e: ITouchEvent) => {
    cardStateRef.current.y = e.touches[0].pageY
  }

  const touchEnd = (e: ITouchEvent) => {
    let gap: number = e.changedTouches[0].pageY - cardStateRef.current.y

    if (gap < 0) {
      setCardState(CardState.Expand)
    }
    if (gap >= 0) {
      setCardState(CardState.Close)
    }
  }

  useImperativeHandle(
    parentRef,
    () => {
      return {
        toggle() {
          setCardState(cardState === CardState.Close ? CardState.Expand : CardState.Close)
        },
      }
    },
    [cardState],
  )

  return (
    // MovableView 大小大于 MovableArea 可在 MovableView - MovableArea 内移动
    <MovableArea className={`${styles.scrollContainer}`} style={{ height: pxTransform(initHeight || 0) }}>
      {/*滑动卡片*/}
      <MovableView
        className={`${styles.upSlide} ${className || ""}`}
        style={{ height: cardHeight }}
        y={CardStatePostion[cardState]}
        direction='vertical'
        onTouchStart={touchStart}
        onTouchEnd={touchEnd}
        animation={true}
        damping={damping || 40}
      >
        <View className={styles.indicatorBox}>
          <View className={styles.indicator}></View>
        </View>

        {children}
      </MovableView>

      {showMask && cardState === CardState.Close && <View className={styles.mask}></View>}
    </MovableArea>
  )
}

export default forwardRef<DavBottomSheetRef, Omit<PropsWithChildren<DavBottomSheetProps>, "parentRef">>(
  (props, ref) => {
    return <DavBottomSheet {...props} parentRef={ref}></DavBottomSheet>
  },
)
