import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectFavorites, selectUserId } from "../../selectors";

import {
  ClearButton,
  FavoritesItemsContainer,
  FavoritesPageContainer,
  FavoritesTitle,
  ProductCartBlock,
} from "./style";
import { ProductCard } from "../../components/product-card/ProductCard";
import { clearFavoritesOnServer, loadFavoritesAsync } from "../../action";

export const FavoritesPage = () => {
  const [loading, setLoading] = useState(false);
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites)


  useEffect(() => {
    dispatch(loadFavoritesAsync(userId)).catch((error) => {
      console.error("Ошибка при загрузке данных", error);
    });
  }, [dispatch]);

  const handleRemoveAll = () => {
    try {
      dispatch(clearFavoritesOnServer(userId));
      sessionStorage.removeItem("favoritesData");
      console.error(`Избранное пользователя ${userId} успешно очищено.`);
      window.location.reload();
    } catch (error) {
      console.error("Ошибка при очистке корзины:", error.message);
    }
  };
  if (loading) return <div>Загрузка избранного...</div>;

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
          {favorites.length === 0 ? (
            <p>Добавьте что-то в избранное</p>
          ) : (
            favorites.map((favorite) => {
              const { product } = favorite;
              return <ProductCard 
              key={product.id} 
              product={product} 
              imgUrl={product.img_url}/>;
            })
          )}
        </ProductCartBlock>
      </FavoritesItemsContainer>
    </FavoritesPageContainer>
  );
};
