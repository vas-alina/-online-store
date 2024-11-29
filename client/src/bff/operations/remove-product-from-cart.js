

import { removeFromCart } from "../../action/remove-from-cart";
import { deleteProductFromCart } from "../api";


export const removeProductFromCart = (cartId) => {
  return async (dispatch) => {
    try {
      await deleteProductFromCart(cartId);  
      dispatch(removeFromCart(cartId));  
    } catch (error) {
      console.error('Ошибка при удалении товара из корзины:', error);
    }
  };
};




// export const removeProductFromCart = async (productId) => {

//     await deleteProductFromCart(productId);
//     const cartProducts = await getProducts();
//     await Promise.all(cartProducts.map(({ id }) => deleteProductFromCart(id)));

//     await deleteProductFromCart(productId);

//     return {
//         error: null,

//         res: true,
//     };
// };
