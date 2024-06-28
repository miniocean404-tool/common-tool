import Modal, { type ModalProps } from "@/components/common/modal";
import { domDestroy, domRender } from "@/utils/global/render";
import type { ITouchEvent } from "@tarojs/components";
import { nanoid } from "nanoid/non-secure";

type CreateModalProps = Omit<ModalProps, "isShow">;

export const createModal = (props: CreateModalProps = { title: "标题", btnLeft: "取消", btnRight: "确定" }) => {
  const onCancel = async (e: ITouchEvent) => {
    domDestroy(node);
    props.onCancel && (await props.onCancel(e));
  };

  const onSure = async (e: ITouchEvent) => {
    domDestroy(node);
    props.onSure && (await props.onSure(e));
  };

  const onGetPhoneNumber = async (e: ITouchEvent) => {
    domDestroy(node);
    props.onGetPhoneNumber && (await props.onGetPhoneNumber(e));
  };

  const node = domRender(
    `__modal_${nanoid()}`,
    <Modal
      title={props?.title}
      btnLeft={props?.btnLeft}
      btnRight={props?.btnRight}
      isShow={true}
      contentSlot={props?.contentSlot}
      onCancel={onCancel}
      onSure={onSure}
      openType={props?.openType}
      onGetPhoneNumber={onGetPhoneNumber}
    ></Modal>,
  );
};
