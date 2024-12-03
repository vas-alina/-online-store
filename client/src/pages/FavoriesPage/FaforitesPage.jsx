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
import { clearFavorites, loadFavoritesAsync, setFavorites } from "../../action";

export const FavoritesPage = () => {
const [loading, setLoading] = useState(false);
  const userId = useSelector(selectUserId);
const dispatch = useDispatch()


const favorites = useSelector((state) => state.favorite?.favorites || []);
console.log('favorites из Redux:', favorites);

useEffect(() => {
  dispatch(loadFavoritesAsync(userId)) // Пример с userId = 123
    .catch((error) => {
      console.error('Ошибка при загрузке данных', error);
    });
}, [dispatch]);


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
          {favorites.length === 0 ? (
            <p>Добавьте что-то в избранное</p>
          ) : (
            favorites.map((favorite) => {
              const { product } = favorite;  
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
