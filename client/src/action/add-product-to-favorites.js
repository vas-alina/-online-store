import { request } from "../utils/request";
import { setFavorites } from "./set-favorites";

export const addProductToFavorites = (productId, userId) => async (dispatch) => {
    try {
      const response = await request('/api/favorites', 'POST', { productId, userId });
      dispatch(setFavorites(response.cartItem)); 
    } catch (error) {
      console.error('Ошибка добавления товара в избранное:', error);
    }
  };