import { request } from "../utils/request";
import { removeComment } from "./remove-comment";


export const removeCommentAsync = (productId, id) => (dispatch) => {
    request(`/api/products/${productId}/commemts`, "DELETE", productId, id).then(() => {
      dispatch(removeComment(id));
    });
  };
