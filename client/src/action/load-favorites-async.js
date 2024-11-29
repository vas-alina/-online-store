import { setFavoriteData } from "./set-favorites";

export const loadFavoritesAsync = (requestServer, favoritesId) => (dispatch) =>
    requestServer("fetchFavorites", favoritesId).then((favoritesData) => {
        if (favoritesData.res) {
            dispatch(setFavoriteData(favoritesData.res))
        }
        return favoritesData;
    });