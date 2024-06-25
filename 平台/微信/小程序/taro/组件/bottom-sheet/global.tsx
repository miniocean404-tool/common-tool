import DavBottomSheet, { type DavBottomSheetProps, type DavBottomSheetRef } from "@/components/common/bottom-sheet"
import { domDestroy, domRender } from "@/utils/global/render"
import { nanoid } from "nanoid/non-secure"
import { createRef, type PropsWithChildren } from "react"
import { document } from "@tarojs/runtime"
import type { ITouchEvent, TouchEventFunction } from "@tarojs/components"

type CreateBottomSheetProps = Omit<PropsWithChildren<DavBottomSheetProps>, "parentRef" | "onComplete"> & { id: string }

export const createBottomSheet = (props: CreateBottomSheetProps) => {
  props = Object.assign(
    {
      id: nanoid(),
      initHeight: 0,
      fullHeight: 0,
      showMask: false,
      slotClass: "",
      children: null,
      isShowButton: false,
      buttonText: "确认",
      showBg: true,
    },
    props,
  )
  const isRender = document.getElementById(`__bottom_sheet_${props.id}`)
  if (isRender) return

  const ref = createRef<DavBottomSheetRef>()

  const onMounted = () => {
    ref.current?.toggle()
  }

  const onComplete = () => {
    domDestroy(node)
  }

  const onSure = (e: ITouchEvent) => {
    domDestroy(node)
    props.onSure && props.onSure(e)
  }

  const node = domRender(
    `__bottom_sheet_${props.id}`,
    <DavBottomSheet
      {...props}
      onSure={onSure}
      onMounted={onMounted}
      onComplete={onComplete}
      ref={ref}
    ></DavBottomSheet>,
  )

  return domDestroy.bind(null, node)
}
