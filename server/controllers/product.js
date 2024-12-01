const { Op } = require('sequelize');
const sequelize = require('../db');
const Product = require('../models/Product')


//add
async function addProduct(product) {
    try {
        const newProduct = await Product.create({
            img_url: product.img_url,
            category: product.category,
            title: product.title,
            price: product.price,
            color: product.color,
            form: product.form,
            width: product.width,
            height: product.height,
            length: product.length,
            desc: product.desc,
        });

        return newProduct;
    } catch (error) {
        throw new Error("Не удалось добавить продукт: используй другой id " + error.message);
    }
}
//edit
async function editProduct(id, product) {
    const transaction = await sequelize.transaction();
    const [updatedCount, [updatedProduct]] = await Product.update(product, {
        where: { id },
        returning: true
    });

    if (updatedCount === 0) {
        return null
    }
    if (product.comments && Array.isArray(product.comments)) {
        await Promise.all(
            product.comments.map(comment => {
                return Comment.update(comment, {
                    where: { id: comment.id },
                    transaction
                });
            })
        );
    }
    await transaction.commit();
    return updatedProduct;

}

//delete
async function deleteProduct(id) {
    const deletedCount = await Product.destroy({ where: { id } });
    return deletedCount > 0;
}


async function getProducts(search = '', limit = 10, page = 1) {
    const offset = (page - 1) * limit;

    try {

        const { count, rows: products } = await Product.findAndCountAll({
            where: {
                title: {
                    [Op.like]: `%${search}%`
                }
            },
            limit: limit,
            offset: offset,
            order: [['created_at', 'DESC']],
        });

        return {
            products,
            lastPage: Math.ceil(count / limit),
        };
    } catch (error) {
        console.error('Ошибка при получении продуктов:', error);
        throw new Error('Ошибка при получении продуктов');
    }
}

//get product
function getProduct(id) {
    return Product.findByPk(id, {
        include: [{
            model: Comment,
            as: 'comments'
        }]
    });
}

module.exports = {
    addProduct,
    editProduct,
    deleteProduct,
    getProduct,
    getProducts
}