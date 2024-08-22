import { getCurrentPages } from '@tarojs/taro'
import { memo, useLayoutEffect, useState } from 'react'
import TipModal from '@/components/common/tip-modal'

const getCurrentPage = () => {
  const pages = getCurrentPages()
  return pages[pages.length - 1]
}

// 作用于函数式的页面，如果是组件式的页面则会导致小程序的声明周期失效
// taro hoc 全局 toast 这样的设计其实很简陋，因为每次渲染都会重新diff整个页面的DOM，如果打算生产使用的话，建议针对每个page组件实现一个shouldComponentUpdate ，提高性能。
// 每一个Page都被封装成了一个单独DOM树，页面与页面的DOM完全相互隔离，假设我在A页面渲染了一个toast，切换到B页面就看不到它了
export const globalHOCRender = (Page) => {
  const MemoPage = memo(Page, (pre, next) => true)

  return (props) => {
    const currentPage = getCurrentPage()
    const [render, setRender] = useState(null)

    useLayoutEffect(() => {
      // 将数据绑定在当前页面一个新的属性上
      currentPage.__renderComponent = {
        refresh: () => setRender(currentPage.__renderComponent?.waitRender),
      }

      return () => {
        // 当页面组件卸载时，清除绑定
        currentPage && delete currentPage.__renderComponent
      }
    }, [currentPage, render])

    return (
      <>
        <MemoPage {...props} />
        {render}
      </>
    )
  }
}

/** 在当前页面渲染组件 */
export const useGlobalHOC = (component, delay) => {
  const currentPage = getCurrentPage()
  const render = currentPage.__renderComponent
  if (!render) return

  const { refresh } = render

  render.waitRender = component
  refresh()

  if (delay !== 0 && delay !== undefined) {
    const deleteComponent = () => refresh()

    setTimeout(deleteComponent, delay)
  }
}

// 提示
export function useTipModal({ type = 'error', content = '', title = '', delay = 1500 }) {
  useGlobalHOC(<TipModal type={type} shadow content={content} title={title} isShow></TipModal>, delay)
}
