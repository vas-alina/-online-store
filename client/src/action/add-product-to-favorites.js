import { request } from "../utils/request";
import { setFavorites } from "./set-favorites";

export const addProductToFavorites = (productId, userId) => async (dispatch) => {
    console.log(productId, userId, "addProductToFavorites")
    try {
      const response = await request('/api/favorites', 'POST', { productId, userId });
      console.log(response)
      dispatch(setFavorites(response.cartItem)); 
    } catch (error) {
      console.error('Ошибка добавления товара в избранное:', error);
    }
  };