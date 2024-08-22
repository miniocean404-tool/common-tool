import TipModal from "@/components/common/tip-modal"
import { domDestroy, domRender } from "./render"
import { nanoid } from "nanoid/non-secure"

interface ToastProps {
  type?: "success" | "error" | "loading"
  msg?: string
  title?: string
  delay?: number
}

export const createToast = ({
  type = "error",
  msg = "",
  title = "",
  delay = 1500,
}: ToastProps): Promise<void> | Promise<any> => {
  const node = domRender(
    `__toast_${nanoid()}`,
    <TipModal type={type} shadow content={msg} title={title} isShow imgUrl={undefined} bg={undefined}></TipModal>,
  )

  return new Promise<void>((resolve) => {
    if (delay !== 0)
      setTimeout(() => {
        domDestroy(node)
        resolve()
      }, delay)
    if (delay === 0) resolve(domDestroy.bind(null, node))
  })
}

export const destroyToast = (node) => domDestroy(node)
