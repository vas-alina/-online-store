const Comment = require('../models/Comment');
const User = require('../models/User');

async function getCommentsByProductId(productId) {
    try {
        const comments = await Comment.findAll({
            where: { product_id: productId },
            include: [
                {
                    model: User,
                    as: 'author',
                    attributes: ['id', 'login'],
                },
            ],
            order: [['createdAt', 'DESC']],
        });
        return comments;
    } catch (error) {
        console.error('Ошибка при получении комментариев:', error);
        throw new Error('Не удалось получить комментарии');
    }
}

async function addComment(productId, comment, authorId) {
    const newComment = await Comment.create({
        ...comment,
        product_id: productId,
        author: authorId
    });
    const authorComment = await Comment.findByPk(newComment.id, {
        include: [{
            model: User,
            as: 'author',
            attributes: ['id', 'login']
        }]
    });
    return authorComment;
}

async function deleteComment(postId, commentId) {
    const deletedCount = await Comment.destroy({
        where: {
            id: commentId,
            postId: postId
        }
    });
    if (deletedCount > 0) {
        await Post.decrement('commentsCount', { where: { id: postId } });
    }
    return deletedCount > 0;
}


module.exports = {
    addComment,
    deleteComment,
    getCommentsByProductId
}