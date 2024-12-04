import { request } from "../utils/request";
import { setCart } from "./set-cart";

export const addProductToCart = (productId, count, userId, ) => async (dispatch) => {
    console.log(productId, userId, count,  "addProductToFavorites")
    try {
      const response = await request('/api/cart', 'POST', { productId,count, userId });
      console.log(response)
      dispatch(setCart(response.cartItem)); 
    } catch (error) {
      console.error('Ошибка добавления товара в корзину:', error);
    }
  };

