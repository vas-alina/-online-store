import { transformFavorite } from "../transformers";

export const getFavorites = async (userIdToFind) => {
    try {
        const response = await fetch(`http://localhost:3010/favorites?userId=${userIdToFind}`);
        if (!response.ok) {
            throw new Error("ошибка получения getFavorites");
        }
        const loadedFavorites = await response.json();
        if (Array.isArray(loadedFavorites)) {

            return loadedFavorites.map(favorite => transformFavorite(favorite));
        } else {
            console.error("Ошибка массива: loadedFavorites", loadedFavorites);
            return [];
        }
    } catch (error) {
        console.error("Ошибка in getFavorites:", error);
        return [];
    }
};