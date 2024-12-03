// import { ACTION_TYPE } from "./action-type";
// export const addProductToCart = (product) => {
//   return async (dispatch) => {
//     dispatch({
//       type: ACTION_TYPE.ADD_PRODUCT_TO_CART,
//       payload: product,
//     }).then((error) => console.log(error))
//   }  

//   };

import { request } from "../utils/request";
import { setCart } from "./set-cart";


// export const addProductToCart = ({ productId, count }) => (dispatch, userId) => {
//   request("/api/cart", "PATCH", { productId, count, userId }).then((productData) => {
//     dispatch(setCart(productData.res));
//   }
//   );
// };
export const addProductToCart = (productId, count, userId) => async (dispatch) => {
  console.log(productId, count, userId, "ответ addUserAd")
  try {
    const response = await request('/api/cart', 'POST', { productId, count, userId });
    console.log(response)
    dispatch(setCart(response.cartItem)); 
  } catch (error) {
    console.error('Ошибка добавления товара в корзину:', error);
  }
};
