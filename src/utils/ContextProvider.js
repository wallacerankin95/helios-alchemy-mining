import { ModalContext } from "./usePriceContext";

const ContextProvider = ({ children }) => {

  const getAdd = (param1, param2) => {
    return param1 + param2;
  }
  
  const getSub = (param1) => {
    return param1;
  }

  return (
    <ModalContext.Provider value={{ getAdd, getSub }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ContextProvider;
