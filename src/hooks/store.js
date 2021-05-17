import { createContext, useContext, useMemo, useReducer } from "react";
import { AppReducer, initialState } from "../reducers/app-reducer";

const StoreContext = createContext({});

export const useStore = () => useContext(StoreContext);

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return <StoreContext.Provider value={contextValue} {...props} />;
}
