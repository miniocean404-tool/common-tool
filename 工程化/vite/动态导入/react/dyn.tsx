import { getToken } from "@/utils/adapter/token"
import { lazy } from "react"
import { redirect, type RouteObject } from "react-router-dom"

type MetaConfig = Record<string | number | symbol, unknown>

export const dynRouters: Array<any> = getRoutes()

function getRoutes(): RouteObject[] {
  const pages = import.meta.glob("/src/(pages|view)/**/index.[jt]sx")

  const configs = import.meta.glob<MetaConfig>([`/src/(pages|view)/**/config.[tj]s`], {
    // 获取导出的模块
    eager: true,
    // 直接获取 default 结果
    import: "default",
  })

  return Object.entries(pages).map<RouteObject>(([path, element]) => {
    const meta = configs[path.replace("index.tsx", "config.ts")]
    path = path.replace(/\/src\/[pages|views]+(?<path>.*)\/index.[tj]sx/gims, "$<path>") || "/"

    const id = path.split("/").filter(Boolean).join("-") || "index"

    // 需要使用下方方式加载
    // <Suspense fallback={<div></div>}>
    //   <RouterProvider router={router} />
    // </Suspense>
    const Page = lazy(element as any)

    return {
      path,
      id,
      index: id === "index",
      // meta,
      element: <Page />,
      loader: ({ request }) => {
        const url = new URL(request.url)
        const path = url.pathname

        if (path !== "/login" && !getToken()) return redirect("/login")
      },
    }
  })
}
