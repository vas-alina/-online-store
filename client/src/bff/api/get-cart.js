import { transformCart } from "../transformers";

// export const getCart = async (userIdToFind) =>
//   fetch(`http://localhost:3010/carts?userId=${userIdToFind}`)
//     .then((loadedCart) => loadedCart.json())
//     .then(([loadedCart]) => loadedCart && transformCart(loadedCart));
export const getCart = async (userIdToFind) => {
  try {
    
    const response = await fetch(`http://localhost:3010/carts?userId=${userIdToFind}`);
    
    
    if (!response.ok) {
      throw new Error('ошибка получения');
    }

   
    const loadedCarts = await response.json();
    
    
    if (Array.isArray(loadedCarts)) {
     
      return loadedCarts.map(cart => transformCart(cart));  
    } else {
     
      console.error('Ошибка массива:', loadedCarts);
      return [];
    }
  } catch (error) {
    
    console.error('Ошибка in getCart:', error);
    return [];
  }
};