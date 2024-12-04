import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { addProductToFavorites, removeFavoritesAsync } from "../../action";

export const FavoriteButton = ({ product,  size = 24 }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorite?.favorites || []);
  const productId = product.id;
  const isFavorite = favorites.some((fav) => fav.id === productId);

  const handleAddToFavorites = () => {
    if (isFavorite) {
      dispatch(removeFavoritesAsync(productId));
    } else {
      dispatch(addProductToFavorites(productId));
    }
  };

  return (
    <div onClick={handleAddToFavorites} style={{ cursor: "pointer" }}>
      {isFavorite ? (
        <FavoriteIcon style={{ color: "red", fontSize: `${size}px` }} />
      ) : (
        <FavoriteBorderIcon style={{ color: "grey", fontSize: `${size}px` }} />
      )}
    </div>
  );
};
