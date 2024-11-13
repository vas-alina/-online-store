//TODO: переписать трансформеры


export const transformProduct = (dbProduct) => ({
  id: dbProduct.id,
  imgUrl: dbProduct.img_url,
  category: dbProduct.category,
  priceRegular: dbProduct.price_regular,
  priceDiscounted: dbProduct.price_discounted,
  title: dbProduct.title,
  form: dbProduct.form,
  color: dbProduct.color,
  desc: dbProduct.desc,
  content: dbProduct.content,
  publishedAt: dbProduct.published_at,
});
