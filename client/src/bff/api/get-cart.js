import { transformCart } from "../transformers";

export const getCart = async (userId) => {
  try {

    const response = await fetch(`http://localhost:3010/carts?userId=${userId}`);
    console.log(userId, 'userId')

    if (!response.ok) {
      throw new Error("ошибка получения");
    }


    const loadedCarts = await response.json();


    if (Array.isArray(loadedCarts)) {

      return loadedCarts.map(cart => transformCart(cart));
    } else {

      console.error("Ошибка массива:", loadedCarts);
      return [];
    }
  } catch (error) {

    console.error("Ошибка in getCart:", error);
    return [];
  }
};