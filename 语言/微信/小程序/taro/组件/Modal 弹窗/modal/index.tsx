import { Button, Image, Text, View, type ITouchEvent, type ButtonProps, type CommonEventFunction } from "@tarojs/components";

import { getSystemInfoSync, nextTick, useReady } from "@tarojs/taro";
import { useEffect, useState } from "react";
import { getWxDomStyleOrDom } from "@/utils/dom";
import { customAlphabet } from "nanoid/non-secure";
import "./index.less";

const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-", 21);

export interface ModalProps {
  className?: string;
  imgUrl?: string;
  isShow?: boolean;
  title?: string;
  btnLeft?: string;
  btnRight?: string;
  content?: string;
  contentSlot?: JSX.Element;
  openType?: "getPhoneNumber";

  onGetPhoneNumber?: CommonEventFunction<ButtonProps.onGetPhoneNumberEventDetail>;
  onCancel?: (e: ITouchEvent) => void;
  onSure?: (e: ITouchEvent) => void;
  onContent?: (content?: string) => void;
}

// 取消确认提示框
export default function Modal({
  className,
  imgUrl,
  title,
  content,
  btnLeft,
  btnRight,
  onCancel,
  onSure,
  onContent,
  isShow,
  contentSlot,
  openType,
  onGetPhoneNumber,
}: ModalProps) {
  const titlePositionClass = content || contentSlot ? "" : "m30";
  const [idClass, setIdClass] = useState("");
  const modalClass = `modal-container ${idClass} ${className || ""}`;

  const [containerPotion, containerPotionHandle] = useState({
    top: "",
    left: "",
  });

  useReady(() => {});

  // class 为数字开头就获取不到 dom
  useEffect(() => setIdClass(nanoid()), []);

  useEffect(() => {
    if (idClass) {
      nextTick(async () => {
        await setLocation();
      });
    }
  }, [idClass]);

  // 设置位置
  async function setLocation() {
    const { windowWidth, windowHeight } = getSystemInfoSync();

    const domArr = await getWxDomStyleOrDom({ node: `.${idClass}`, rect: true });
    const dom = domArr[0];

    // 居中样式不可使用rpx,会自动转换为px,编译时指定了设备宽度375，会导致不同机型的实际rpx比例不一致，会导致偏移问题
    containerPotionHandle({
      top: `${(windowHeight - dom?.height) / 2}px`,
      left: `${(windowWidth - dom?.width) / 2}px`,
      // @ts-ignore
      visibility: "",
    });
  }

  const isVisibility = { visibility: isShow ? "" : "hidden" };

  return (
    <View>
      {/* @ts-ignore */}
      <View id="modal-bg" catchMove onTouchMove={(e) => e.preventDefault()} style={isVisibility}></View>

      {/* @ts-ignore */}
      <View style={isVisibility}>
        <View className={modalClass} style={{ visibility: "hidden", ...containerPotion }}>
          <View className="modal-top-container">
            {/*图片*/}
            {imgUrl && <Image src={imgUrl} className="modal-img" mode="aspectFit" />}

            {/*标题*/}
            <Text className={"modal-title " + titlePositionClass}>{title}</Text>

            {/*文字内容*/}
            {(content || contentSlot) && (
              <View className="modal-content" onClick={() => onContent && onContent(content)}>
                {content && <Text>{content}</Text>}
                {contentSlot && contentSlot}
              </View>
            )}
          </View>

          {/*按钮组*/}
          <View className="modal-button-group">
            {btnLeft && onCancel && (
              <Button className="left" plain onClick={onCancel}>
                {btnLeft}
              </Button>
            )}

            <Button
              className="right"
              plain
              onClick={!openType ? onSure : undefined}
              openType={openType}
              onGetPhoneNumber={openType === "getPhoneNumber" ? onGetPhoneNumber : undefined}
            >
              {btnRight}
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}
