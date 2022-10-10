import { Text, View } from '@tarojs/components'

import styles from './index.module.less'
import { useEffect, useState } from 'react'
import { getWxDomStyleOrDom } from '@/utils/dom'

const currentState = {
  close: '收起',
  open: '展开',
}

const TextWarpCss = ({ className, content, hiddenLine, state }) => {
  const containerClass = `${styles['text-warp-css']} ${className || ''}`
  const [operateState, setOperateState] = useState(state)
  const [hiddenLineHeight, setHiddenLineHeight] = useState('')
  const [isShowButton, setIsShowButton] = useState(false)

  const isOpen = operateState === 'open'

  useEffect(async () => {
    const res = await getWxDomStyleOrDom({ node: `.${styles.text}`, style: ['line-height'], rect: true })
    const height = Number(res[0]['line-height'].slice(0, 2))

    setIsShowButton(Math.ceil(res[1].height / height) >= hiddenLine)
    setHiddenLineHeight(`${height * hiddenLine}px`)
  }, [])

  const handleShowClose = () => {
    const isShow = operateState === 'open' ? 'close' : 'open'
    setOperateState(isShow)
  }

  return (
    <View className={containerClass}>
      <View className={`${styles.text}`} style={{ maxHeight: isOpen ? hiddenLineHeight : 'none' }}>
        {/*按钮*/}
        {isShowButton && (
          <View className={styles.btn} onClick={handleShowClose}>
            <Text className={styles.btnText} style={{ visibility: isOpen ? '' : 'hidden' }}>
              ...
            </Text>
            <Text>{currentState[operateState]}</Text>
          </View>
        )}

        {content}
      </View>
    </View>
  )
}

TextWarpCss.defaultProps = {
  className: '',
  state: 'open',
  hiddenLine: 3,
}

export default TextWarpCss
