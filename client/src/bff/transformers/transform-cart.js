export const transformCart = (dbCart) => ({
  id: dbCart.id,
  productId: dbCart.product_id,
  userId: dbCart.user_id,
  count: dbCart.count,
  itemsCart: dbCart.items_cart
});
