import { createContext, useContext, useReducer, type Dispatch, type Reducer } from "react";

interface DavBottomSheetProviderValue {
  state?: DavBottomSheetProviderState;
  dispatch?: Dispatch<ActionProp>;
}

interface DavBottomSheetProviderState {
  buttonDisable?: boolean;
}

interface ActionProp {
  type: string;
}

const P = createContext<DavBottomSheetProviderValue>({});

const BottomSheetProvider = ({ children }) => {
  const [state, dispatch] = useReducer<Reducer<DavBottomSheetProviderState, ActionProp>>((state, action) => {
    switch (action.type) {
      case "":
        return { ...state };
      default:
        return state;
    }
  }, {});

  return <P.Provider value={{ state, dispatch }}>{children}</P.Provider>;
};

// 使用 use 开头，便于 React 能识别这是一个自定义 Hook
const useBottomSheetStore = () => {
  return useContext(P);
};

export default BottomSheetProvider;
