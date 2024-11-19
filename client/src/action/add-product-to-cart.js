// import { ACTION_TYPE } from "./action-type";
// export const addProductToCart = (product) => {
//   return async (dispatch) => {
//     dispatch({
//       type: ACTION_TYPE.ADD_PRODUCT_TO_CART,
//       payload: product,
//     }).then((error) => console.log(error))
//   }  

//   };

import { setCartData } from "./set-cart";

export const addProductToCart = (requestServer, userId, productId, imgUrl, title, color, form, count) => (dispatch) => {
  requestServer("addProductToCart", userId, productId, imgUrl, title, color, form, count).then((productData) => {
    dispatch(setCartData(productData.res));
  }
  );
};
