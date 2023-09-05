import { error } from './utils'

const _App = App

export const appHooks = {
  onLaunch: [],
  onShow: [],
  onHide: [],
  onError: [],
  onPageNotFound: [],
}

App = (app) => {
  Object.keys(appHooks).forEach((hook) => {
    if (appHooks[hook].length) {
      const originHook = app[hook]
      app[hook] = function (...args) {
        originHook?.apply(this, args)

        appHooks[hook].forEach((method) => {
          try {
            method.apply(this, args)
          } catch (err) {
            error('appHooks', hook, method, err)
          }
        })
      }
    }
  })
  _App(app)
}
