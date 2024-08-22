import Taro from "@tarojs/taro";

export const GlobalLoadFont = () => {
  Taro.loadFontFace({
    global: true,
    family: "Oswald",
    source: 'url("https://davinci-main-mini-program.oss-cn-beijing.aliyuncs.com/font/Oswald-Bold.ttf")',
  });
};

GlobalLoadFont()
