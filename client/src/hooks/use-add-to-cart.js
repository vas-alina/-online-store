import { useState } from "react";
import { ROLE } from "../constans";
import { useSelector } from "react-redux";
import { selectProduct, selectUserId } from "../selectors";

export const useAddToCart = (userRole) => {
    const [cart, setCart] = useState([]);
    const userId = useSelector(selectUserId)
    const product = useSelector(selectProduct)
    const addToCart = async ({ count }) => {

        if (userRole === ROLE.GUEST) {
            const localCart = JSON.parse(localStorage.getItem('cart')) || [];
            const updatedCart = [...localCart, { product, count }];
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            setCart(updatedCart);
        } else if (userRole === ROLE.USER) {
            try {
                const response = await fetch('http://localhost:3010/carts', {
                    method: "POST",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({
                        user_id: userId,
                        product_id: product.id,
                        img_url: product.imgUrl,
                        title: product.title,
                        color: product.color,
                        form: product.form,
                        count: count,

                    }),
                });

                if (response.ok) {
                    const updatedCart = await response.json();
                    setCart(updatedCart);
                } else {
                    console.error('Ошибка при добавлении в корзину');
                }
            } catch (error) {
                console.error("Ошибка добавления в корзину", error);
            }
        }
    };

    return { cart, addToCart };
};