import { request } from "../utils/request";
import { setProductData } from "./set-product-data";
// export const saveProductAsync = (newProductData ) => async (dispatch) => {
//     try {
//       // Отправляем запрос на обновление продукта
//       const updatedProduct = await request(`/api/products/${id}`, "PATCH", newProductData);

//       // Проверяем наличие данных в ответе
//       if (updatedProduct && updatedProduct.data) {
//         // Обновляем состояние продукта в хранилище
//         dispatch(setProductData(updatedProduct.data));
//         return updatedProduct.data;
//       } else {
//         throw new Error("Некорректный ответ от сервера");
//       }
//     } catch (error) {
//       // Обрабатываем ошибку и, возможно, диспатчим действие для обработки ошибок
//       console.error("Ошибка сохранения продукта:", error);
//       throw error;  // Прокидываем ошибку для дальнейшей обработки в UI
//     }
//   };

// export const saveProductAsync = (id, newProductData) => (dispatch) => {
//     const saveRequest = id ? 
//     request(`/api/products/${id}`, "PATCH", newProductData) :
//     request("/api/products", "POST", newProductData)
    
//     saveRequest.then((updatedProduct) => {
//         dispatch(setProductData(updatedProduct.data))
//         return updatedProduct.data;
//     })
// }
export const saveProductAsync = (id, newProductData) => (dispatch) => {
    // Определяем тип запроса (PATCH для существующего продукта, POST для нового)
    const saveRequest = id
      ? request(`/api/products/${id}`, "PATCH", newProductData) // для редактирования
      : request("/api/products", "POST", newProductData); // для создания нового продукта
  
    // Возвращаем сам промис, чтобы он мог быть использован в .then()
    return saveRequest.then((updatedProduct) => {
        console.log(updatedProduct);
      // Отправляем данные о продукте в store
      dispatch(setProductData(updatedProduct.data));
      return updatedProduct.data; // возвращаем данные, которые могут быть использованы дальше
    }).catch((error) => {
      // Если произошла ошибка, выводим в консоль
      console.error('Ошибка при сохранении продукта:', error);
      throw error; // Пробрасываем ошибку дальше
    });
  };