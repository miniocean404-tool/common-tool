import React, { Suspense } from "react"
import ReactDOM from "react-dom/client"

import { RouterProvider } from "react-router-dom"
import router from "@/router"

import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { persist, store } from "./store"

import "./css/base/base.scss"

const root = document.getElementById("root")!

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persist}>
        {(_isLoading) => (
          <Suspense fallback={<div></div>}>
            <RouterProvider router={router} />
          </Suspense>
        )}
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
