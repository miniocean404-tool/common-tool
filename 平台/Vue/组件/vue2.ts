import Loading from "./component/index.vue";
import Vue from "vue";

Loading.install = function (Vue: any) {
  Vue.prototype.$Loading = showLoading;
};

// 可以搭配 vue 2.7 的 Vue3 写法
export function showLoading(options = { duration: 1500 }) {
  options = Object.assign({ show: true, duration: 1500 }, options);

  // 生成一个 Vue 子类
  const ins = mountComponents(Loading, options);

  const timer = setTimeout(() => {
    ins.$destroy();
    document.body.removeChild(ins.$el);
    clearTimeout(timer);
  }, options.duration);
}

function mountComponents(Component: any, option: { [key: string]: any }) {
  const ComponentConstructor = Vue.extend(Component);

  // 生成一个该子类的实例
  const instance = new ComponentConstructor();

  for (const key in option) {
    instance[key] = option[key];
  }

  instance.$mount(document.createElement("div"));
  document.body.appendChild(instance.$el);

  return instance;
}

export default Loading;
