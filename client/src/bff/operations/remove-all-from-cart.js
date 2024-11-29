

import { clearCart } from "../../action";
import { getProducts } from "../api";
import { clearCartOnServer } from "../api";
import { getCarts } from "../api";
// export const removeAllFromCart = async (id) => {

//     await clearCartOnServer(id);
//     const products = await getProducts(id);
//     await Promise.all(products.map(({ id: userId }) => clearCartOnServer(userId)));

//     return {
//         error: null,
//         res: true,
//     };
// };

export const removeAllFromCart = (userId) => async (dispatch) => {
    try {
      await clearCartOnServer(userId);
  

      const carts = await getCarts(userId);
      await Promise.all(carts.map(({ id }) => clearCartOnServer(id)));
  
      dispatch(clearCart());
  
      return { error: null, res: true }; 
    } catch (error) {
      console.error("Ошибка при очистке корзины: от removeAllFromCart", error.message);
      return { 
        error: error.message, 
        res: false
     }; 
    }
  };