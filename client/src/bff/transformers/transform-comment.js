export const transformComment = (dbComment) => ({
  id: dbComment.id,
  productId: dbComment.product_id,
  authorId: Comment.author_id,
  publishedAt: dbComment.published_at,
  content: dbComment.content,
});
