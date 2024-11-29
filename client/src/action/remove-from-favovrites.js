import { ACTION_TYPE } from "./action-type";

export const removeFromFavorites = (favoriteId) => {
    return {
      type: ACTION_TYPE.REMOVE_FROM_CART,
      payload: favoriteId,
    };
  };