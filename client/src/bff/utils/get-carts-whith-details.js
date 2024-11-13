import { getProduct, getUser } from "../api";

export const cartsWithDetails = await Promise.all(carts.map(async (cart) => {
    const product = await getProduct(cart.productId);
    const user = await getUser(cart.userId)

    return {
        ...cart,
        product,
        user,
 
     };
    }))