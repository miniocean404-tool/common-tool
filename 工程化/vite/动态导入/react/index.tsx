import { RouteObject, createBrowserRouter, json, redirect } from "react-router-dom"
import { RefObject, createRef } from "react"

import App from "@/App"

import NotFound from "./state/404"
import ErrorPage from "./state/error"
import { dynRouters } from "./dyn"

// const Home = lazy(() => import("@/pages/home/index"))

type BrowserRouterType = ReturnType<typeof createBrowserRouter>

console.log(dynRouters)

const routes: RouteObject[] = [
  {
    id: "root",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      // 子路由需要在其父路由的页面中添加 <Outlet />
      ...dynRouters,
      {
        id: "",
      },

      // {
      //   path: "/home",
      //   index: true,
      //   element: <Home />,
      // },
    ],
  },
  // 404找不到
  { path: "*", element: <NotFound /> },
]

/**
 * 将路由展平，并添加 nodeRef 字段
 * @param routerParams RouteObject[]
 * @returns RouteObject[]
 */
function flatRouters(routerParams: RouteObject[]) {
  let newRouters: Array<RouteObject & { nodeRef: RefObject<any> }> = []

  routerParams.forEach((router) => {
    newRouters.push({
      ...router,
      nodeRef: createRef(),
    })

    if (router.children?.length) {
      newRouters = newRouters.concat(flatRouters(router.children))
    }
  })
  return newRouters
}

const newRouters = flatRouters(routes)

// 也可以使用 useRoutes
const router: BrowserRouterType = createBrowserRouter(routes, { basename: "/" })

export { newRouters }

export default router
