import { document } from "@tarojs/runtime";
import { render, unmountComponentAtNode } from "@tarojs/react";
import Taro from "@tarojs/taro";

export const domRender = (id: string, Component: JSX.Element) => {
  const pageElement = getPageRoot();

  const view = document.createElement("view");
  view.id = id;

  // 在 view 上渲染组件
  render(Component, view);
  pageElement?.appendChild(view);

  return view;
};

export const domDestroy = (node) => {
  const pageElement = getPageRoot();

  unmountComponentAtNode(node);
  pageElement?.removeChild(node);
};

const getPageRoot = () => {
  const currentPages = Taro.getCurrentPages();
  const currentPage = currentPages[currentPages.length - 1]; // 获取当前页面对象
  const path = currentPage.$taroPath;

  return document.getElementById(path);
};
