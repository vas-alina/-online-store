import { useState } from "react";
import { ROLE } from "../constans";
import { useSelector } from "react-redux";
import { selectProduct, selectUserId } from "../selectors";


export const useAddToFavorites = (userRole) => {
    const [favorites, setFavorites] = useState([]);
    const userId = useSelector(selectUserId)
    const product = useSelector(selectProduct)
    
    const addToFavorites = async () => {

        if (userRole === ROLE.GUEST) {
            const localFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
            const updatedFavorites = [...localFavorites, { product }];
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            setFavorites(updatedFavorites);
        } else if (userRole === ROLE.USER) {
            try {
                const response = await fetch('http://localhost:3010/favorites', {
                    method: "POST",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({
                        user_id: userId,
                        product_id: product.id,
                        img_url: product.imgUrl,
                        price: product.price,
                        title: product.title,
                        color: product.color,
                        form: product.form,

                    }),
                });

                if (response.ok) {
                    const updatedFavorites = await response.json();
                    setFavorites(updatedFavorites);
                } else {
                    console.error('Ошибка при добавлении в избранное');
                }
            } catch (error) {
                console.error("Ошибка добавления в избранное", error);
            }
        }
    };

    return { favorites, addToFavorites };
};