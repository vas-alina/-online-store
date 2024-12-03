import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId } from "../../selectors";
import { fetchFavorites } from "../../bff/operations";
import { clearFavoritesOnServer } from "../../bff/api";
import {
  ClearButton,
  FavoritesItemsContainer,
  FavoritesPageContainer,
  FavoritesTitle,
  ProductCartBlock,
} from "./style";
import { ProductCard } from "../../components/product-card/ProductCard";
import { clearFavorites } from "../../action";
import { request } from "../../utils/request";

export const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = useSelector(selectUserId);
const dispatch = useDispatch()
const [error, setError] = useState(null)

useEffect(() => {
  const loadFavorites = async () => {
    setLoading(true);
    try {
      const favoriteResponse = await request(`/api/favorites/${userId}`, "GET");

      if (Array.isArray(favoriteResponse.favorite)) {
        const productsWithDetails = await Promise.all(favoriteResponse.favorite.map(async (favorite) => {
          const productDetails = await request(`/api/products/${favorite.product_id}`, "GET");
          return { ...favorite, ...productDetails };
        }));
        setFavorites(productsWithDetails);
      } else {
        setError("Ответ с сервера не содержит данных в правильном формате.");
        console.error("Ответ с сервера:", favoriteResponse);
      }
    } catch (error) {
      setError("Ошибка загрузки избранного");
      console.error("Ошибка загрузки избранного:", error);
    } finally {
      setLoading(false);
    }
  };

  if (userId) {
    loadFavorites();
  }
}, [userId]);

  const handleRemoveAll = async () => {
    try {
      if (userId) {
        await clearFavoritesOnServer(userId);
        dispatch(clearFavorites());            
        setFavorites([]);              
      } else {
        console.error('userId отсутствует');
      }
    } catch (error) {
      console.error('Ошибка при очистке корзины:', error.message);
    }
  };
  if (loading) return <div>Загрузка корзины...</div>;

  return (
    <FavoritesPageContainer>
      <FavoritesItemsContainer>
        <FavoritesTitle>
          <h2>Избранное</h2>
          <ClearButton onClick={handleRemoveAll}>
            Очистить избранное
          </ClearButton>
        </FavoritesTitle>
         <ProductCartBlock>
          {Array.isArray(favorites) && favorites.length === 0 ? (
            <p>Добавьте что-то в избранное</p>
          ) : (
            Array.isArray(favorites) &&
            favorites.map((product) => {
              return (
                <ProductCard
                  key={product.id}
                  product={product}    
                />
              );
            })
          )}
        </ProductCartBlock>
      </FavoritesItemsContainer>
      {console.log(favorites)}
    </FavoritesPageContainer>
  );
};
