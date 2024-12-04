import { request } from "../utils/request";


export const removeFavoritesAsync = (id) => () =>
    request(`/api/favorites/${id}`, "DELETE")