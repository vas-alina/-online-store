
import { getFavorites, getProduct, getUser } from "../api";

export const fetchFavorites = async () => {
     const favorites = await getFavorites();
     console.log(Array.isArray(favorites));  
     console.log(favorites);

     const getFavoritesWithDetails = await Promise.all(favorites.map(async (favorite) => {
        const product = await getProduct(favorite.productId);
        const user = await getUser(favorite.userId)

        return {
            ...favorite,
            product,
            user,
     
         };
     }));

     return {
        error: null,
        res: {
            favorites: getFavoritesWithDetails,
        }
     }
    
};
