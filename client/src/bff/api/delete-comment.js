export const deleteComment = async (commentId) =>
  fetch(`http://localhost:3010/comments/${commentId}`, {
    method: "DELETE",
  });
