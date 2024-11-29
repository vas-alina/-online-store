
const User = require('./User');
const Order = require('./Order');
const Cart = require('./Cart');
const Product = require('./Product');  
const Favorite = require('./Favorite')

function setupAssociations() {
    // пользователь имеет несколько товаров в корзине
    User.hasMany(Cart, { foreignKey: 'user_id', as: 'carts' });
    Cart.belongsTo(User, { foreignKey: 'user_id' });
    
    // пользователь может иметь несколько заказов
    User.hasMany(Order, { foreignKey: 'user_id', as: 'orders' });
    Order.belongsTo(User, { foreignKey: 'user_id' });
    
    // один заказ состоит из нескольких корзин
    Order.hasMany(Cart, { foreignKey: 'order_id', as: 'carts' });
    Cart.belongsTo(Order, { foreignKey: 'order_id' });

     // Корзина связана с одним продуктом
     Cart.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });
     Product.hasMany(Cart, { foreignKey: 'product_id', as: 'carts' }); 

    //пользователь может иметь несколько товаров в избранном
    User.hasMany(Favorite, { foreignKey: 'user_id', as: 'favorites' });
    Favorite.belongsTo(User, { foreignKey: 'user_id' });

    //в одном избранном может быть несколько товаров
    Favorite.hasMany(Product, { foreignKey: 'product_id', as: 'products' });
    Product.belongsTo(Favorite, { foreignKey: 'product_id', as: 'favorite' });
}

module.exports = setupAssociations;