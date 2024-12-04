import { request } from "../utils/request";
import { setFavorites } from "./set-favorites";


export const loadFavoritesAsync = (userId) => async (dispatch) => {
    try {
        const data = await request(`/api/favorites/${userId}`, 'GET');
        if (data && data.favorite) {
            dispatch(setFavorites({ items: data.favorite }));
        } else {
            console.error('Ошибка: данные о фаворитах отсутствуют в ответе:', data);
        }
    } catch (error) {
        console.error('Ошибка при загрузке фаворитов:', error);
    }
  };