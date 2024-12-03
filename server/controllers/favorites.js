const Favorite = require('../models/Favorite');
const Product = require('../models/Product');


//get
async function getFavorites(userId) {

    const favorite = await Favorite.findAll({
        where: { user_id: userId },
        include: [{
            model: Product,
            // as: 'products',
            as: 'product',
            attributes: ["id", "title", "price", "img_url", "color", "form"],
            
        }]
    });
    return favorite
}
//add
async function addFavorites(userId, productId, product) {
    const existingFavorite = await Favorite.findOne({ where: { user_id: userId, product_id: productId } });
    if (existingFavorite) {
        throw new Error("Product is already in favorites.");
    }
    const favorite = await Favorite.create(
        {
            user_id: userId,
            product_id: productId,
            favorite_count: 1

        })
    return favorite
}
//delete
async function deleteFavorites(userId, favoriteId) {
    const deletedCount = await Favorite.destroy({
        where: {
            id: favoriteId,
            user_id: userId,
        }
    });

    if (deletedCount > 0) {
        await Favorite.decrement('favorite_count', { where: { id: favoriteId } });
    }

    return deletedCount > 0;
}
//clear favorites
async function deleteAllFavorites(userId) {
    const deletedCount = await Favorite.destroy({
        where: {
            user_id: userId
        }
    });

    return deletedCount > 0;
}



module.exports = { addFavorites, deleteFavorites, deleteAllFavorites, getFavorites };