import { createApp } from "vue";
import Toast from "./index.vue";

const showToast = (msg, options = { duration: 1500 }) => {
  options = Object.assign({ show: true, duration: 1500 }, options);

  const div = document.createElement("div");
  const componentInstance = createApp(Toast, options);

  componentInstance.mount(div);
  document.body.appendChild(div);

  const timer = setTimeout(() => {
    componentInstance.unmount(div);
    document.body.removeChild(div);
    clearTimeout(timer);
  }, options.duration);
};

export default showToast;
