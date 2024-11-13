import { deleteProductFromCart, getProducts } from "../api";




export const removeProductFromCart = async (productId) => {

    await deleteProductFromCart(productId);
    const cartProducts = await getProducts();
    await Promise.all(cartProducts.map(({ id }) => deleteProductFromCart(id)));

    await deleteProductFromCart(productId);

    return {
        error: null,

        res: true,
    };
};
