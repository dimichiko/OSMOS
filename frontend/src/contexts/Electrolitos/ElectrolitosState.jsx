import ElectrolitosContext from "./ElectrolitosContext";
import ElectrolitosReducer from "./ElectrolitosReducer";
import axios from "../../config/axios";
import { useReducer, useCallback } from "react";

const ElectrolitosState = (props) => {
  const initialState = {
    electrolitos: [],
  };

  const [globalState, dispatch] = useReducer(ElectrolitosReducer, initialState);

  const getProducts = useCallback(async () => {
    try {
      const res = await axios.get("/product/readall");
      console.log("RES.DATA ===>", res.data);
      dispatch({
        type: "GET_PRODUCTS",
        payload: res.data
      });
      console.log("Respuesta del backend:", res.data);
    } catch (err) {
      console.error("Error al obtener productos:", err);
    }
  }, []);

  return (
    <ElectrolitosContext.Provider
      value={{
        Electrolitos: globalState.electrolitos,
        getProducts, 
      }}
    >
      {props.children}
    </ElectrolitosContext.Provider>
  );
};

export default ElectrolitosState;