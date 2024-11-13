import { ACTION_TYPE } from "./action-type";
export const addProductToCart = (product) => {
  return async (dispatch) => {
    dispatch({
      type: ACTION_TYPE.ADD_PRODUCT_TO_CART,
      payload: product,
    }).then((error) => console.log(error))
  }  
    
  };