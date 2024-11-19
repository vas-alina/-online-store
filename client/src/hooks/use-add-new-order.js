import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCart, selectUserId } from "../selectors";

export const useAddNewOrder = () => {
    const [order, setOrder] = useState({});
    const userId = useSelector(selectUserId)
    const cart = useSelector(selectCart)
    const addNewOrder = async (orderData) => {
            try {
                const response = await fetch('http://localhost:3010/orders', {
                    method: "POST",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({
                        ...orderData,
                        id: cart.id,
                        user_id: userId,
                        created_at: new Date().toISOString(),
                    }),
                });

                if (response.ok) {
                    const updatedOrder = await response.json();
                    setOrder(updatedOrder);
                } else {
                    console.error('Ошибка заказа');
                }
            } catch (error) {
                console.error("Ошибка добавления заказа", error);
            }
        
    };

    return { order, addNewOrder };
};