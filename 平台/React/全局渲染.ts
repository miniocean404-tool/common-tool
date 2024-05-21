import type { ReactNode } from "react"
import ReactDOM from "react-dom/client"

export const domRender = (id: string, Component: ReactNode) => {
  const app = document.body
  const isRendered = document.querySelector(`#${id}`)

  const view = document.createElement("div")
  view.id = id

  // 渲染
  const root = ReactDOM.createRoot(view)
  root.render(Component)

  if (!isRendered) app?.appendChild(view)

  return root
}

export const domDestroy = (node: ReactDOM.Root) => {
  node.unmount()
}
