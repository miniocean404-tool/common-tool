import { error } from './utils'

const _Page = Page

export const pageHooks = {
  onLoad: [],
  onShow: [],
  onReady: [],
  onHide: [],
  onUnload: [],
  onResize: [],
  onRouteDone: [],
  onPageScroll: [],
  onTabItemTap: [],
  onReachBottom: [],
  onShareTimeline: [],
  onSaveExitState: [],
  onAddToFavorites: [],
  onPullDownRefresh: [],
  onShareAppMessage: [],
}

Page = (page) => {
  Object.keys(pageHooks).forEach((hook) => {
    if (pageHooks[hook].length) {
      const originHook = page[hook]
      page[hook] = function (...args) {
        originHook?.apply(this, args)

        pageHooks[hook].forEach((method) => {
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
