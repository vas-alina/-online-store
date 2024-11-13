import { getCart, getProduct, getUser} from "../api";


export const fetchCart = async () => {
     const carts = await getCart();

     const getCartsWithDetails = await Promise.all(carts.map(async (cart) => {
        const product = await getProduct(cart.productId);
        const user = await getUser(cart.userId)

        return {
            ...cart,
            product,
            user,
     
         };
     }));

     return {
        error: null,
        res: {
            carts: getCartsWithDetails,
        }
     }
    
};
