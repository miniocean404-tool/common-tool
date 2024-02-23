// zustand 简单源码：https://juejin.cn/post/7313242064195797001?searchId=20240223143356DB46BE80969F73ACF98F

import { useSyncExternalStore } from "react";

const createStore = (createState) => {
  let state;
  const listeners = new Set();

  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;

    if (!Object.is(nextState, state)) {
      const previousState = state;

      if (!replace) {
        state = typeof nextState !== "object" || nextState === null ? nextState : Object.assign({}, state, nextState);
      } else {
        state = nextState;
      }
      listeners.forEach((listener) => listener(state, previousState));
    }
  };

  const getState = () => state;

  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const destroy = () => {
    listeners.clear();
  };

  const api = { setState, getState, subscribe, destroy };

  state = createState(setState, getState, api);

  return api;
};

function useStore(api, selector) {
  function getState() {
    return selector(api.getState());
  }

  return useSyncExternalStore(api.subscribe, getState);
}

export const create = (createState) => {
  const api = createStore(createState);

  const useBoundStore = (selector) => useStore(api, selector);

  Object.assign(useBoundStore, api);

  return useBoundStore;
};
