const { Op } = require('sequelize');
const sequelize = require('../db');
const Product = require('../models/Product')



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

async function editProduct(productId, productData) {

    const transaction = await sequelize.transaction();
    try {

        const existingProduct = await Product.findByPk(productId);
        if (!existingProduct) {
            throw new Error('Продукт с таким ID не найден');
        }

        const [updatedCount, updatedProduct] = await Product.update(productData, {
            where: { id: productId },
            returning: true,
            transaction,
        });

        if (updatedCount === 0) {
            throw new Error('Продукт не найден или не был обновлён');
        }
        await transaction.commit();
        return updatedProduct[0];
    } catch (error) {
        await transaction.rollback();
        console.error('Error during transaction:', error);
        throw error;
    }
}


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


async function getProduct(id) {
    try {
      const product = await Product.findByPk(id);
  
      if (!product) {
        return null;
      }
      return product;
    } catch (error) {
      console.error('Ошибка при получении продукта:', error);
      throw new Error('Ошибка при получении продукта из базы данных');
    }
  }

module.exports = {
    addProduct,
    editProduct,
    deleteProduct,
    getProduct,
    getProducts
}