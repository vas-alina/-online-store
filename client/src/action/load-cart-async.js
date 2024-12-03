import { request } from "../utils/request";
import { setCart } from "./set-cart";


export const loadCartAsync = (userId) => (dispatch) => {
    return request(`/api/cart/${userId}`, "GET")
        .then((cart) => {
            if (cart.data) {
                dispatch(setCart(cart.data.cart));
            }
            return cart;
        })
        .catch((error) => {
            console.error("Ошибка при загрузке корзины:", error);
        });
};


// export const loadCartAsync = (userId) => {
//     return async (dispatch) => {
//       try {
//         const response = await request(`/api/cart/${userId}`, "GET");
//         console.log('Cart Data:', response.data.cart); // Должен быть массив товаров
//         dispatch(setCart(response.data.car));
//       } catch (error) {
//         console.error('Ошибка загрузки корзины:', error);
//       }
//     };
//   };