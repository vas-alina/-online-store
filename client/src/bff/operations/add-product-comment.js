import { addComment, getProduct } from "../api";
import { ROLE } from "../constans/role";
import { sessions } from "../sessions";
import { getProductCommentsWithAuthor } from "../utils";

export const addProductComment = async (hash, userId, productId, content) => {
  const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR, ROLE.USER];

  const access = await sessions.access(hash, accessRoles);

  if (!access) {
    return {
      error: "Доступ запрещен",
      res: null,
    };
  }

  await addComment(userId, productId, content);

  const product = await getProduct(productId);

  const commentsWithAuthor = await getProductCommentsWithAuthor(productId)


  return {
    error: null,
    res: {
      ...product,
      comments: commentsWithAuthor,
    },
  };
};
