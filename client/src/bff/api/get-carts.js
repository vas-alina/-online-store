import { transformCart } from "../transformers";

export const getCarts = () =>
  fetch("http://localhost:3010/carts")
    .then((loadedCarts) => loadedCarts.json())
    .then((loadedCarts) => loadedCarts && loadedCarts.map(transformCart));