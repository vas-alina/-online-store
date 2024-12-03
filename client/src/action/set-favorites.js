import { ACTION_TYPE } from "./action-type";

export const setFavorites = (payload) => ({
    type: ACTION_TYPE.SET_FAVORITES,
    payload,
});