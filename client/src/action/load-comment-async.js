import { request } from "../utils/request";
import { setComments } from "./set-comment";

export const loadCommentsAsync = (productId) => async (dispatch) => {
    try {
        const data = await request(`/api/products/${productId}/comments`, "GET");
        dispatch(setComments({ items: data.comments }));
    } catch (error) {
        console.error("Ошибка при получении комментариев:", error);
    }
};