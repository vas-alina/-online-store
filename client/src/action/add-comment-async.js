
import { request } from "../utils/request";
import { addComment } from "./add-comment";

export const addCommentAsync = (productId, content) => async (dispatch) => {
  try { 
    const response = await request(`/api/products/${productId}/comments`, "POST", {content, productId});
    dispatch(addComment(response.data)); 
  } catch (error) {
    console.error("Ошибка добавления комментария:", error);  
  }
};