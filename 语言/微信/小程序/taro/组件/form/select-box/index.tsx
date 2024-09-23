import { Text, View } from "@tarojs/components"
import classNames from "classnames"
import { PropsWithChildren } from "react"
import "./index.scss"

interface DavSelectBoxProps {
  className?: string
  content?: string
  placeholder?: string
  onClick?: () => void
  type?: "select" | "unselect"
  disabled?: boolean
  error?: string
}

function DavSelectBox({ className, content, placeholder, onClick, type, disabled, error }: PropsWithChildren<DavSelectBoxProps>) {
  const containerClass = `dav-select-box ${className || ""}`

  return (
    <View className={containerClass}>
      <View
        className={classNames({ "select-container": true, unselect: type === "unselect", select: type === "select" })}
        onClick={disabled ? undefined : onClick}
      >
        <Text className="content">{content ? content : placeholder}</Text>
      </View>

      {error && <View className="error">{error}</View>}
    </View>
  )
}

DavSelectBox.propTypes = {}

DavSelectBox.defaultProps = {
  onClick: () => {},
  className: "",
  content: "",
  placeholder: "",
}

export default DavSelectBox
