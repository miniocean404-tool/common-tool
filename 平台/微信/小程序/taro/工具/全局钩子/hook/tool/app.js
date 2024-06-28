import { error } from './utils'
import { AppHooks } from '../app'

const _App = App

App = (app) => {
  Object.keys(AppHooks).forEach((hook) => {
    if (AppHooks[hook].length) {
      const originHook = app[hook]
      app[hook] = function (...args) {
        originHook?.apply(this, args)

        AppHooks[hook].forEach((method) => {
          try {
            method.apply(this, args)
          } catch (err) {
            error('AppHooks', hook, method, err)
          }
        })
      }
    }
  })
  _App(app)
}
