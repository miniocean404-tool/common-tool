import DavBottomSheet, { type DavBottomSheetProps, type DavBottomSheetRef } from "@/components/common/bottom-sheet";
import { domDestroy, domRender } from "@/utils/global/render";
import { nanoid } from "nanoid/non-secure";
import { createRef, type PropsWithChildren } from "react";
import { document } from "@tarojs/runtime";

type CreateBottomSheetProps = Omit<PropsWithChildren<DavBottomSheetProps>, "parentRef" | "onComplete"> & { id: string };

export const createBottomSheet = (props: CreateBottomSheetProps) => {
  props = Object.assign(
    {
      id: nanoid(),
      initHeight: 300,
      fullHeight: 0,
      showMask: true,
      slotClass: "",
      children: null,
      isShowButton: false,
      buttonText: "确认",
      showBg: true,
    },
    props,
  );
  const isRender = document.getElementById(`__bottom_sheet_${props.id}`);
  if (isRender) return;

  const ref = createRef<DavBottomSheetRef>();

  const onMounted = () => {
    ref.current?.toggle();
  };

  const onComplete = () => {
    domDestroy(node);
  };

  const node = domRender(`__bottom_sheet_${props.id}`, <DavBottomSheet {...props} onMounted={onMounted} onComplete={onComplete} ref={ref}></DavBottomSheet>);

  return domDestroy.bind(null, node);
};
