import { useState } from "react";
import { ROLE } from "../constans";

export const useAddToCart = (userRole) => {
    const [cart, setCart] = useState([]);

    const addToCart = async (productId, count = 1) => {
        console.log("Adding to cart:", { productId, count });
        if (userRole === ROLE.GUEST) {
            const localCart = JSON.parse(localStorage.getItem('cart')) || [];
            const updatedCart = [...localCart, { productId, count }];
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            setCart(updatedCart);
        } else if (userRole === ROLE.USER) {
            try {
                const response = await fetch('http://localhost:3010/cart', {
                    method: "POST",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({ productId, count })
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