import { createSelectorQuery, nextTick } from '@tarojs/taro'

// 文档：https://developers.weixin.qq.com/miniprogram/dev/api/wxml/wx.createSelectorQuery.html
// 获取 dom 属性、小程序自带属性、DOM style=['height'] prop=['indicatorColor']
// class 为数字开头就获取不到 dom
export function getWxDomStyleOrDom({ node, style = [], prop = [], rect = false }) {
	return new Promise((resolve, reject) => {
		nextTick(() => {
			const query = createSelectorQuery()

			const selectNode = query.select(node)

			if (style.length > 0 || prop.length > 0) {
				selectNode.fields(
					{
						id: true,
						dataset: true,
						mark: true,
						rect: true,
						size: true,
						scrollOffset: true,
						properties: prop,
						computedStyle: style,
						context: true,
						node: true,
					},
					(styleInfo) => {}
				)
			}

			if (rect) {
				selectNode.boundingClientRect((rectInfo) => {})
			}

			// 使用 selectNode 调用的结果
			query.exec((queryApiResult) => {
				resolve(queryApiResult)
			})
		})
	})
}
