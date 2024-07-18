import { createWeAPPStorage } from "@/store/plugin/localstorge";

export const persistConfig = {
  key: "root", // 必须有的
  storage: createWeAPPStorage, // 缓存机制
  throttle: 100,
  // stateReconciler: autoMergeLevel2 // 合并 reducer 的几层深度
  blacklist: ["testDrive"], // reducer 里不持久化的数据,除此外均为持久化数据
  // whitelist: ['loginStatus'], // reducer 里持久化的数据,除此外均为不持久化数据
};
