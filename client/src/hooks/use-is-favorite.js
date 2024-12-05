import { useSelector } from 'react-redux';
import { selectFavorites } from '../selectors';


const useIsFavorite = (productId) => {
  const favorites = useSelector(selectFavorites);
  return favorites.some((fav) => fav.id === productId);
};

export default useIsFavorite;