import { getComments, getProducts } from "../api";
import { getCommentsCount } from "../utils";

export const fetchProducts = async (searchPhrase, page, limit) => {
    const [{ products, links }, comments] = await Promise.all([
        getProducts(searchPhrase, page, limit),
        getComments()
    ])
    return {
        error: null,
        res: {
            products: products.map((product) => ({
                ...product,
                commentsCount: getCommentsCount(comments, product.id),
            })),
            links,
        },
    };
};
