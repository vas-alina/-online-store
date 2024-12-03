import { useNavigate } from "react-router-dom";
import { Icon } from "..";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {
  ActionBlock,
  Card,
  CardItem,
  Image,
  Price,
  ProductCardContainer,
} from "./style";
import { useDispatch, useSelector } from "react-redux";
import { selectUserRole } from "../../selectors";
import { useAddToFavorites } from "../../hooks/use-add-to-favorites";

export const ProductCard = ({ product }) => {
  const { product_id, title, img_url, favorite_count, createdAt } = product;
  const navigate = useNavigate();
  const userRole = useSelector(selectUserRole);
  const { addToFavorites } = useAddToFavorites(userRole);
  const dispatch = useDispatch();


  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  
  const handleAddToFavorites = ({product}) => {
    // const product = { id, imgUrl, title, price }; 
    dispatch(addToFavorites(product)); 
  };

  return (
    <ProductCardContainer>
      <Card>
        <CardItem onClick={handleCardClick}>
          <Image src={product.imgUrl} alt={product.title} />
          <div>
           <h2>{product.title}</h2>
          <h3>{product.form}{product.color}</h3>
          
          </div>
          
        </CardItem>

        <ActionBlock>
          <Icon
            icon={FavoriteBorderIcon}
            size="25px"
            color="var(--item-color)"
            hoverColor="darkorange"
            onClick={handleAddToFavorites} 
          />
          <Price>{product.price} ₽</Price> 
          <Icon
            icon={AddShoppingCartIcon}
            size="25px"
            color="var(--item-color)"
            hoverColor="darkorange"
            border="1px solid var(--item-color)"
            borderRadius="2px"
          />
        </ActionBlock>
      </Card>
    </ProductCardContainer>
  );
};

