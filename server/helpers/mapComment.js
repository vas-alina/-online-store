module.exports = function (comment) {
    return {
        content: comment.content,
        author: comment.author,
        product_id:comment.productId,
        id: comment.id,
        publishedAt: comment.createdAt
    }
}