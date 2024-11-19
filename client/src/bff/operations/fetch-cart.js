import { getCart, getProduct, getUser} from "../api";


export const fetchCart = async () => {
     const carts = await getCart();
     console.log(Array.isArray(carts));  
     console.log(carts);

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
