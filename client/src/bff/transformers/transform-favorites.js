export const transformFavorite = (dbFavorite) => ({
    id: dbFavorite.id,
    productId: dbFavorite.product_id,
    userId: dbFavorite.user_id,
    imgUrl: dbFavorite.img_url,
    title: dbFavorite.title,
    color: dbFavorite.color,
    form: dbFavorite.form,
  });
  