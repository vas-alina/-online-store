import { ACTION_TYPE } from "./action-type";

export const setFavorites = (favoritesData) => ({
    type: ACTION_TYPE.SET_FAVORITES,
    payload: favoritesData,
});