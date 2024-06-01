import { createLogger } from "redux-logger";

export const middleware = (getDefaultMiddleware) => {
  // defaultMiddleware 中 Immutability Middleware 是因为防止直接使用 state.xx = 'xx' 修改数据，store 中 state 的数据监听修改是
  // 监听的 state 对象是否改变，而没有监听其中的属性
  const middleware = getDefaultMiddleware({ serializableCheck: { ignoredActions: ["persist/PERSIST"] } });
  if (process.env.NODE_ENV === "development") middleware.push(createLogger());
  return middleware;
};
