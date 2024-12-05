import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { addProductToFavorites, removeFavoritesAsync } from "../../action";
// import { selectFavorites } from "../../selectors";
import useIsFavorite from "../../hooks/use-is-favorite";

export const FavoriteButton = ({ product,  size = 24 }) => {
  const dispatch = useDispatch();
  // const favorites = useSelector(selectFavorites);
  const productId = product.id;
  const isFavorite = useIsFavorite(productId);

  const handleToogleToFavorites = () => {
    if (isFavorite) {
      dispatch(removeFavoritesAsync(productId));
    } else {
      dispatch(addProductToFavorites(productId));
    }
  };

  return (
    <div onClick={handleToogleToFavorites} style={{ cursor: "pointer" }}>
      {isFavorite ? (
        <FavoriteIcon style={{ color: "red", fontSize: `${size}px` }} />
      ) : (
        <FavoriteBorderIcon style={{ color: "grey", fontSize: `${size}px` }} />
      )}
    </div>
  );
};
