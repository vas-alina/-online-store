const User = require('./User');
const Order = require('./Order');
const Cart = require('./Cart');
const Product = require('./Product');
const Favorite = require('./Favorite')
const Comment = require('./Comment')

function setupAssociations() {
    // пользователь имеет несколько корзин
    User.hasMany(Cart, { foreignKey: 'user_id', as: 'carts' });
    Cart.belongsTo(User, { foreignKey: 'user_id' });

    // пользователь может иметь несколько заказов
    User.hasMany(Order, { foreignKey: 'user_id', as: 'orders' });
    Order.belongsTo(User, { foreignKey: 'user_id' });

    // один заказ состоит из нескольких корзин
    Order.hasMany(Cart, { foreignKey: 'order_id', as: 'carts' });
    Cart.belongsTo(Order, { foreignKey: 'order_id' });

    // пользователь может иметь несколько товаров в избранном
    User.hasMany(Favorite, { foreignKey: 'user_id', as: 'favorites' });
    Favorite.belongsTo(User, { foreignKey: 'user_id' });

    // в одном избранном может быть несколько товаров 
    Favorite.belongsToMany(Product, { through: 'FavoriteProducts', foreignKey: 'favorite_id', as: 'favoriteProducts' });
    Product.belongsToMany(Favorite, { through: 'FavoriteProducts', foreignKey: 'product_id', as: 'productFavorites' });

    // в одной корзине может быть несколько товаров 
    Cart.belongsToMany(Product, { through: 'CartProducts', foreignKey: 'cart_id', as: 'cartProducts' });
    Product.belongsToMany(Cart, { through: 'CartProducts', foreignKey: 'product_id', as: 'productCart' });


    Favorite.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });
    Product.hasMany(Favorite, { foreignKey: 'product_id', as: 'favorites' });

    Cart.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });
    Product.hasMany(Cart, { foreignKey: 'product_id', as: 'carts' });

    Comment.belongsTo(User, { foreignKey: 'author_id', as: 'author' });
    Product.hasMany(Comment, { foreignKey: 'product_id', as: 'comments' });
    Comment.belongsTo(Product, { foreignKey: 'product_id' });
}


module.exports = setupAssociations;