import { Text, View } from '@tarojs/components'

import styles from './index.module.less'
import { useEffect, useState } from 'react'
import { getWxDomStyleOrDom } from '@/utils/dom'

const currentState = {
  close: '收起',
  open: '展开',
}

const TextWarpJs = ({ className, content, hiddenLine, state, isShowButtonFn }) => {
  const containerClass = `${styles['text-warp-js']} ${className || ''}`

  const [operateState, setOperateState] = useState(state)
  const [isShowButton, setIsShowButton] = useState(false)

  // 设置超过三行使用 ... 并且打开按钮
  useEffect(async () => {
    const res = await getWxDomStyleOrDom({ node: `.${styles.content}`, style: ['line-height'] })
    let line = res[0]['line-height']
    const lineHeight = Number(line.substr(0, line.indexOf('px')))
    const num = Math.round(res[0].height / lineHeight)
    if (num > hiddenLine) {
      setIsShowButton(true)
      isShowButtonFn(true)
    }
  })

  const openOrClose = () => {
    const isShow = operateState === 'open' ? 'close' : 'open'
    setOperateState(isShow)
    isShowButtonFn(isShow)
  }

  return (
    <View className={containerClass}>
      <View
        className={`${styles.content} ${styles.hidden}`}
        style={{ '-webkit-line-clamp': operateState === 'open' && isShowButton ? `${hiddenLine}` : '' }}
      >
        {content}
      </View>

      {isShowButton && (
        <Text className={styles.operate} onClick={openOrClose}>
          {currentState[operateState]}
        </Text>
      )}
    </View>
  )
}

TextWarpJs.defaultProps = {
  className: '',
}

export default TextWarpJs
