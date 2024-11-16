import { transformCart } from "../transformers";

export const getCart = async () =>
  fetch(`http://localhost:3010/carts/`)
    .then((res) => {
      if (res.ok) {
        return res;
      }

      const error = res.status === 404
        ? 'Такая страница не существует Ответ getCart'
        : 'Что-то пошло не так..'

      return Promise.reject(error)
    })
    .then((loadedCart) => loadedCart.json())
    .then((loadedCart) => loadedCart && transformCart(loadedCart));