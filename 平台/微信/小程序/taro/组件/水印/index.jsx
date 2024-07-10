import { Canvas, View } from '@tarojs/components'
import { createCanvasContext, canvasToTempFilePath, createOffscreenCanvas } from '@tarojs/taro'
import { useEffect, useState } from 'react'
import styles from './index.module.less'

const CANVAS_ID = 'WatermarkCanvas'

export default function DavWatermark({ className, text = '', isOffScreen = true }) {
	const containerClass = `${styles['dav-watermark']} ${className || ''}`

	const [textImg, settextImg] = useState('')

	useEffect(() => {
		isOffScreen ? offscreenCanvas() : setFontCanvas()
	}, [])

	const offscreenCanvas = () => {
		const rowText = text + '      '
		const canvas = createOffscreenCanvas({ type: '2d', width: 240, height: 160 })
		const ctx = canvas.getContext('2d')

		ctx.font = '14px sans-serif'
		ctx.fillStyle = 'rgba(0, 0, 0, 0.06)'
		ctx.textAlign = 'left'
		ctx.fillText(rowText, 0, 14)

		const base64 = ctx.canvas.toDataURL('image/png')
		settextImg(base64)
	}

	// 设置水印字体
	function setFontCanvas() {
		const ctx = createCanvasContext(CANVAS_ID)
		const rowText = text + '      '

		ctx.beginPath() //开始绘制

		ctx.setFontSize(14)
		ctx.setFillStyle('rgba(0, 0, 0, 0.06)')
		ctx.fillText(rowText, 0, 14)

		ctx.rect(0, 0, ctx.width, ctx.height)
		ctx.stroke()

		ctx.draw(false, () => {
			canvasToTempFilePath({
				canvasId: CANVAS_ID,
				success: function (res) {
					settextImg(res.tempFilePath)
				},
			})
		})
	}

	return (
		<View className={containerClass}>
			<View className={`${styles.img} `} style={{ backgroundImage: `url('${textImg}')` }}></View>
			<View className={`${styles.img} ${styles.right}`} style={{ backgroundImage: `url('${textImg}')` }}></View>

			{!isOffScreen && <Canvas className={styles.canvas} style={{ width: 240, height: 160 }} canvasId={CANVAS_ID}></Canvas>}
		</View>
	)
}
