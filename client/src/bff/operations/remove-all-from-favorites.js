

import { getProducts } from "../api";
import { clearFavoritesOnServer } from "../api";

export const removeAllFromFavorites = async (id) => {
    
    await clearFavoritesOnServer(id);
    const products = await getProducts(id);
    await Promise.all(products.map(({ id: userId }) => clearFavoritesOnServer(userId)));

    return {
        error: null,
        res: true,
    };
};
