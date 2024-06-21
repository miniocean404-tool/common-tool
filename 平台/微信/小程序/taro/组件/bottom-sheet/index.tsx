import { MovableArea, MovableView, View, type BaseEventOrig, type ITouchEvent, type MovableViewProps, type TouchEventFunction } from "@tarojs/components";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState, type FC, type ForwardedRef, type PropsWithChildren } from "react";
import styles from "./index.module.scss";
import { pxTransform } from "@tarojs/taro";
import { getSystemInfoSync } from "@tarojs/taro";
import DavButton from "@/components/common/button";
import { debounce } from "@/utils/frequency-pref";

export interface DavBottomSheetProps {
  className?: string;

  slotClass?: string;

  showBg?: boolean;
  showMask?: boolean;

  initHeight?: number;
  fullHeight: number;

  damping?: number;

  parentRef?: ForwardedRef<DavBottomSheetRef>;

  isShowButton?: boolean;
  buttonText?: string;
  onSure?: TouchEventFunction;
  onCancel?: () => void;
  onMounted?: () => void;
  onComplete?: () => void;
}

export interface DavBottomSheetRef {
  toggle: () => void;
}

const CardStatePostion = {
  expand: -100000,
  close: 0,
};

enum CardState {
  Expand = "expand",
  Close = "close",
}

const DavBottomSheet: FC<PropsWithChildren<DavBottomSheetProps>> = ({
  className,
  showMask,
  showBg,
  children,
  initHeight,
  fullHeight,
  damping,
  parentRef,
  isShowButton,
  buttonText,
  onSure,
  onCancel,
  onMounted,
  onComplete,
}) => {
  const [cardState, setCardState] = useState(CardState.Close);
  const cardStateRef = useRef({ y: 0, isMove: false });

  const windowHeight = getSystemInfoSync().windowHeight;
  const cardHeight = (fullHeight && pxTransform(fullHeight)) || windowHeight * (4 / 5);

  useEffect(() => {
    onMounted && onMounted();
  }, []);

  const touchStart = (e: ITouchEvent) => {
    cardStateRef.current.y = e.touches[0].pageY;
  };

  const onChnage = (e: BaseEventOrig<MovableViewProps.onChangeEventDetail>) => {
    if (e.detail.source === "touch") {
    } else {
      cardState === CardState.Close && onComplete && debounce(onComplete, 100)();
    }
  };

  const onVTouchMove = (_: ITouchEvent) => {
    cardStateRef.current.isMove = true;
  };

  const touchEnd = (e: ITouchEvent) => {
    if (!cardStateRef.current.isMove) return;

    let gap: number = e.changedTouches[0].pageY - cardStateRef.current.y;

    if (gap < 0) {
      setCardState(CardState.Expand);
    }
    if (gap >= 0) {
      setCardState(CardState.Close);
      onCancel && onCancel();
    }

    cardStateRef.current.isMove = false;
  };

  const innerOnsure = (e: ITouchEvent) => {
    setCardState(CardState.Close);
    onSure && onSure(e);
  };

  const backgroundClick = () => {
    setCardState(CardState.Close);
    onCancel && onCancel();
  };

  const innerToggle = () => {
    if (cardState === CardState.Close) {
      setCardState(CardState.Expand);
    } else if (cardState === CardState.Expand) {
      setCardState(CardState.Close);
      onCancel && onCancel();
    }
  };

  useImperativeHandle(
    parentRef,
    () => {
      return {
        toggle() {
          innerToggle();
        },
      };
    },
    [cardState],
  );

  const getIsShowBackground = () => !!(showBg && cardState === CardState.Expand);

  // MovableView 大小大于 MovableArea 可在 MovableView - MovableArea 内移动
  return (
    <>
      <MovableArea className={`${styles.scrollContainer}`} style={{ height: pxTransform(initHeight || 0) }}>
        {/*滑动卡片*/}
        <MovableView
          onChange={onChnage}
          className={`${styles.upSlide} ${className || ""}`}
          style={{ height: cardHeight }}
          y={CardStatePostion[cardState]}
          direction="vertical"
          onTouchStart={touchStart}
          onTouchEnd={touchEnd}
          onVTouchMove={onVTouchMove}
          animation={true}
          damping={damping || 60}
        >
          <View className={styles.content}>
            <View className={styles.indicatorBox}>
              <View className={styles.indicator}></View>
            </View>

            {children}
          </View>

          {isShowButton && (
            // 不会带着拖动，但是还是会触发父组件的 touchStart touchEnd 事件
            <View catchMove>
              <DavButton className={styles.sureButton} onClick={innerOnsure}>
                {buttonText}
              </DavButton>
            </View>
          )}
        </MovableView>

        {showMask && cardState === CardState.Close && <View className={styles.mask}></View>}
      </MovableArea>

      <View
        className={styles.bg}
        onClick={backgroundClick}
        style={{
          visibility: getIsShowBackground() ? "visible" : "hidden",
          opacity: getIsShowBackground() ? 1 : 0,
        }}
      ></View>
    </>
  );
};

export default forwardRef<DavBottomSheetRef, Omit<PropsWithChildren<DavBottomSheetProps>, "parentRef">>((props, ref) => {
  return <DavBottomSheet {...props} parentRef={ref}></DavBottomSheet>;
});
