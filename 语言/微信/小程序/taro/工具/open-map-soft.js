import { openLocation } from "@tarojs/taro";

export const openMapSoft = ({ latitude, longitude, address, complete, fail, name, scale = 18, success }) => {
  openLocation({
    latitude,
    longitude,
    scale,
  });
  // 直接在当前页面打开导航软件，但是必须有个 Map 组件
  // const map = createMapContext('map')
  // map.openMapApp({
  //   latitude: 39.95933,
  //   longitude: 116.29845,
  //   destination: '打开地址',
  // })
};
