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

export const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  console.log("начальное состояние", favorites);
  const [loading, setLoading] = useState(false);
  const userId = useSelector(selectUserId);
const dispatch = useDispatch()
  useEffect(() => {
    let isMounted = true;

    const loadFavorites = async () => {
      setLoading(true);
      try {
        const favoriteResponse = await fetchFavorites(userId);

        if (isMounted) {
          setFavorites(favoriteResponse.res.favorites);
        }
      } catch (error) {
        console.error("Ошибка загрузки избранного:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    loadFavorites();
    return () => {
      isMounted = false;
    };
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
        {favorites.length === 0 ? (
          <p>Добавьте что то в избранное</p>
        ) : (
          favorites.map((product) => {
            return (
              <ProductCard
                key={product.id}
                id={product.productId}
                imgUrl={product.imgUrl}
                title={product.title}
                price={product.price}
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
