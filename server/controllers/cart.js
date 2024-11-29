const Cart = require("../models/Cart");
const Product = require("../models/Product");

//add
async function addCart(req, res) {
    const { productId, count } = req.body;
    if (!productId || !count) {
        return res.status(400).send({ error: "id продукта или колличетво не переданы." });
    }
    const product = await Product.findOne({ where: { id: productId } });
    if (!product) {
        return res.status(404).send({ error: "Продукт не найден." });
    }

    const userId = req.user.id;

    const existingCartItem = await Cart.findOne({
        where: { user_id: userId, product_id: productId }
    });

    if (existingCartItem) {
        existingCartItem.count += count;
        await existingCartItem.save();
        return existingCartItem;
    } else {
        const newCartItem = await Cart.create({
            user_id: userId,
            product_id: productId,
            img_url: product.img_url,
            price: product.price,
            title: product.title,
            color: product.color,
            form: product.form,
            count: count
        })

        return newCartItem
    }

}


//delete all
async function deleteAllCart(userId) {
    const deletedCount = await Cart.destroy({
        where: {
            user_id: userId
        }
    });

    return deletedCount > 0;
}

//delete item
async function deleteCart(userId, cartId) {
    const deletedCount = await Cart.destroy({
        where: {
            id: cartId,
            user_id: userId,
        }
    });

    if (deletedCount > 0) {
        await Cart.decrement('cart_count', { where: { id: cartId } });
    }

    return deletedCount > 0;
}



//get cart
async function getCart(userId) {

    const cart = await Cart.findAll({
        where: { user_id: userId },
        include: [{
            model: Product,
            as: 'products',
            attributes: ["id", "title", "price", "img_url", "color", "form", "price"]
        }]
    });
    return cart
}

module.exports = {
    addCart,
    deleteAllCart,
    deleteCart,
    getCart
}