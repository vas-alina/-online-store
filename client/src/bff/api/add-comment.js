import { generateDate } from "../utils";

export const addComment = (userId, productId, content) =>
  fetch("http://localhost:3010/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      author_id: userId,
      product_id: productId,
      published_at: generateDate(),
      content,
    }),
  });
