import { ACTION_TYPE } from "./action-type";
export const setCart = (cart) => {
  console.log('Received cart data:', cart);  
  return {
    type: ACTION_TYPE.SET_CART_DATA,
    payload: cart,
  };
};

// export const setCart = (cartData) => ({
//   type: ACTION_TYPE.SET_CART_DATA,
//   payload: cartData,
  
// });
// export const setCart = (cartItems) => ({
//   type: ACTION_TYPE.SET_CART_DATA,
//   payload: cartItems , 
// });