import Toast from "./index.jsx"
import { domDestroy, domRender } from "../全局渲染.ts"
// import { nanoid } from "nanoid/non-secure"

interface ToastProps {
  type?: "success" | "error" | "loading"
  title?: string
  msg?: string
  delay?: 0 | number
}

const id = "__toast"

export const createToast = ({ type = "error", msg = "", title = "", delay = 1500 }: ToastProps) => {
  const node = domRender(id, <Toast type={type} shadow desc={msg} title={title} isShow />)

  if (delay !== 0) setTimeout(() => domDestroy(id, node), delay)
  if (delay === 0) return domDestroy.bind(null, node)
}

export const destroyToast = (node) => domDestroy(id, node)
