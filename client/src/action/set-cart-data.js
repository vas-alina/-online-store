import { ACTION_TYPE } from "./action-type";

export const setCartData = (cartData) => ({
  type: ACTION_TYPE.SET_CART,
  payload: cartData,
});
