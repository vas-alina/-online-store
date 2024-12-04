
import { request } from "../utils/request";
import { clearFavorites } from "./clear-favorites";

export const clearFavoritesOnServer = (userId) => async (dispatch) => {
  try {
    const response = await request("/api/favorites/", 'DELETE', { userId });
    if (response.ok) {
      dispatch(clearFavorites());
    }
  } catch (error) {
    console.error('Ошибка при очистке избранного на сервере:', error.message);
    throw error;
  }
};