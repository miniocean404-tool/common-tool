import classNames from "classnames"
import React, { useEffect, useState } from "react"
import { Input, Text, View, Image } from "@tarojs/components"
import { CommonEvent } from "@tarojs/components/types/common"
import { DavSearchBarProps } from "./search-bar"
import "./search-bar.scss"

import clone_icon from "./image/close.png"
import search_icon from "./image/search.png"

type ExtendEvent = {
  target: {
    value: string
  }
}

const DavSearchBar: React.FC<DavSearchBarProps> = (props) => {
  const {
    value = "",
    placeholder = "搜索",
    maxLength = 140,
    fixed = false,
    sticky = false,
    focus = false,
    disabled = false,
    showActionButton = false,
    actionName = "搜索",
    inputType = "text",
    enableNative = true,
    onClick = () => {},
    onChange = () => {},
    onFocus = () => {},
    onBlur = () => {},
    onConfirm = () => {},
    onActionClick = () => {},
    onClear,
    className,
    customStyle,
  } = props

  const [isFocus, setIsFocus] = useState(!!focus)

  useEffect(() => {
    if (focus !== undefined) {
      setIsFocus(!!focus)
    }
  }, [focus])

  const handleFocus = (event: CommonEvent): void => {
    setIsFocus(true)
    onFocus && onFocus(event)
  }

  const handleBlur = (event: CommonEvent): void => {
    setIsFocus(false)
    onBlur && onBlur(event)
  }

  const handleChange = (e: CommonEvent & ExtendEvent): void => {
    onChange(e.detail.value, e)
  }

  const handleClear = (event: CommonEvent): void => {
    if (onClear) {
      onClear(event)
    } else {
      onChange("", event)
    }
  }

  const handleConfirm = (event: CommonEvent): void => {
    onConfirm && onConfirm(event)
  }

  const handleActionClick = (event: CommonEvent): void => {
    onActionClick && value && onActionClick(event)
  }

  const fontSize = 14
  const rootCls = classNames(
    "at-search-bar",
    {
      "at-search-bar--fixed": fixed,
      "at-search-bar--sticky": sticky,
    },
    className,
  )

  const placeholderWrapStyle: React.CSSProperties = {}
  const actionStyle: React.CSSProperties = {}

  if (isFocus || (!isFocus && value)) {
    actionStyle.opacity = 1
    actionStyle.marginRight = `0`
    placeholderWrapStyle.flexGrow = 0
  } else if (!isFocus && !value) {
    placeholderWrapStyle.flexGrow = 1
    actionStyle.opacity = 0
    actionStyle.marginRight = `-${(actionName.length + 1) * fontSize + fontSize / 2 + 10}px`
  }
  if (showActionButton) {
    actionStyle.opacity = 1
    actionStyle.marginRight = `0`
  }

  const clearIconStyle: React.CSSProperties = { display: "flex" }
  const placeholderStyle: React.CSSProperties = { visibility: "hidden" }
  if (!value.length) {
    clearIconStyle.display = "none"
    placeholderStyle.visibility = "visible"
  }

  return (
    <View className={rootCls} style={customStyle}>
      <View className="at-search-bar__input-cnt" onClick={onClick}>
        <View className="at-search-bar__placeholder-wrap" style={placeholderWrapStyle}>
          <Image className="at-search-bar__search" src={search_icon}></Image>
          <Text className="at-search-bar__placeholder" style={placeholderStyle}>
            {isFocus ? "" : placeholder}
          </Text>
        </View>

        <Input
          className="at-search-bar__input"
          type={inputType}
          confirmType="search"
          value={value}
          focus={isFocus}
          disabled={disabled}
          maxlength={maxLength}
          // @ts-ignore ci 上面这个检查不通过, 暂时跳过ts检查
          enableNative={enableNative}
          onInput={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onConfirm={handleConfirm}
        />

        <View className="at-search-bar__clear" style={clearIconStyle} onClick={handleClear}>
          <Image className="at-search-bar__close" src={clone_icon}></Image>
        </View>
      </View>

      <View className="at-search-bar__action" style={actionStyle} onClick={handleActionClick}>
        {actionName}
      </View>
    </View>
  )
}

export default DavSearchBar
