import { removeFromFavorites } from "../../action";
import { deleteProductFromFavorites } from "../api";


export const removeProductFromFavorites = (favoritesId) => {
  return async (dispatch) => {
    try {
      await deleteProductFromFavorites(favoritesId);
      dispatch(removeFromFavorites(favoritesId));
    } catch (error) {
      console.error('Ошибка при удалении товара из избранного:', error);
    }
  };
};
