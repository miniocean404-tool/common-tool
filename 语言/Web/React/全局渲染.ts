import type { ReactNode } from "react"
import ReactDOM from "react-dom/client"

export const domRender = (id: string, Component: ReactNode) => {
  const app = document.body

  const view = document.createElement("div")
  view.id = id

  // 渲染
  const root = ReactDOM.createRoot(view)
  root.render(Component)

  // if (!isRendered)
  app?.appendChild(view)

  return root
}

export const domDestroy = (id: string, node: ReactDOM.Root) => {
  const app = document.body
  node.unmount()
  app.removeChild(document.querySelector(`#${id}`))
}
