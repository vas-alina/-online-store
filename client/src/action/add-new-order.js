import { request } from "../utils/request";
import { setOrder } from './set-order';

export const addNewOrder = (orderData) => async (dispatch) => {
    console.log(orderData,  "addNewOrder")
    try {
      const response = await request('/api/order', 'POST', orderData);
      console.log(response)
      dispatch(setOrder(response.order)); 
    } catch (error) {
      console.error('Ошибка добавления заказа в  базу:', error);
    }
  };