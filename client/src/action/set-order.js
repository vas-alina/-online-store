import { ACTION_TYPE } from "./action-type";
export const setOrder = (order) => {
  console.log('Received order data:', order);  
  return {
    type: ACTION_TYPE.SET_ORDER_DATA,
    payload: order,
  };
};