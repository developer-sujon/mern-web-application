import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  isLoading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setLoading":
      return (state.isLoading = true);
    case "removeLoading":
      return (state.isLoading = false);
    default:
      return state;
  }
};

export const LoadingContext = createContext(INITIAL_STATE);

export const LoadingContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <LoadingContext.Provider
      value={{
        isLoading: state.isLoading,
        dispatch,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};
