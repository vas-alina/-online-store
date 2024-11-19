export const transformCart = (dbCart) => ({
  id: dbCart.id,
  productId: dbCart.product_id,
  userId: dbCart.user_id,
  imgUrl: dbCart.img_url,
  title: dbCart.title,
  color: dbCart.color,
  form: dbCart.form,
  count: dbCart.count,

});
