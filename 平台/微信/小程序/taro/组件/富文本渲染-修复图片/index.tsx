import { Text, View } from "@tarojs/components"
import ModalContent from "@/components/busin/test-drive-modal-content"
import Taro from "@tarojs/taro"
import "@tarojs/taro/html5.css"
import "./index.less"
import { PropsWithChildren } from "react"

interface FontIntroduceProps {
  title: string
  content: string
  titleClass?: string
  contentClass?: string
  type?: string
  className?: string
}

export default function FontIntroduce({
  title,
  content,
  titleClass,
  contentClass,
  type = "richText",
  className,
}: PropsWithChildren<FontIntroduceProps>) {
  // 处理图片问题
  Taro.options.html.transformElement = (el) => {
    if (el.nodeName === "image") {
      el.setAttribute("mode", "widthFix")
    }
    return el
  }

  content = decodeURIComponent(content || "")

  return (
    <View className={`font-introduce ${className || ""}`}>
      <Text className={"title " + titleClass}>{title}</Text>
      {type === "text" && <ModalContent className={`${contentClass}`} textObj={{ alertText: content }}></ModalContent>}
      {type === "richText" && (
        <View className={"taro_html " + contentClass} dangerouslySetInnerHTML={{ __html: content }}></View>
      )}
    </View>
  )
}
