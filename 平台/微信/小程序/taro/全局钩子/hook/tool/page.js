import { error } from './utils'
import { PageHooks } from '../page'

const _Page = Page

Page = (page) => {
  Object.keys(PageHooks).forEach((hook) => {
    if (PageHooks[hook].length) {
      const originHook = page[hook]

      page[hook] = function (...args) {
        originHook?.apply(this, args)

        PageHooks[hook].forEach((method) => {
          try {
            method.apply(this, args)
          } catch (err) {
            error('pageHook', hook, method, err)
          }
        })
      }
    }
  })
  _Page(page)
}
