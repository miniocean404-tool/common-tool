import React from 'react'
import Taro from '@tarojs/taro'
import { render, unmountComponentAtNode } from '@tarojs/react'
import { document } from '@tarojs/runtime'
import TipModal from '@/components/common/tip-modal'

export const TaroToast = ({ type = 'error', msg = '', title = '', delay = 1500 }) => {
  const view = document.createElement('view')
  view.id = '__toast'

  const currentPages = Taro.getCurrentPages()
  const currentPage = currentPages[currentPages.length - 1] // 获取当前页面对象
  const path = currentPage.$taroPath
  const pageElement = document.getElementById(path)

  render(<TipModal type={type} shadow content={msg} title={title} isShow></TipModal>, view)
  pageElement?.appendChild(view)

  if (delay !== 0) {
    setTimeout(() => {
      destroyToast(view)
    }, delay)
  }

  if (delay === 0) {
    return destroyToast.bind(null, view)
  }
}

export const destroyToast = (node) => {
  const currentPages = Taro.getCurrentPages()
  const currentPage = currentPages[currentPages.length - 1]
  const path = currentPage.$taroPath
  const pageElement = document.getElementById(path)

  unmountComponentAtNode(node)
  pageElement?.removeChild(node)
}
