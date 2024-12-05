import { useNavigate } from "react-router-dom";
import { Icon } from "..";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { FavoriteButton } from "../favorite-button/Favorite-button";
import {
  ActionBlock,
  Card,
  CardItem,
  Image,
  Price,
  ProductCardContainer,
  TitleGroup,
} from "./style";

export const ProductCard = ({ product, imgUrl }) => {
  const image = product.imgUrl || imgUrl;
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <ProductCardContainer>
      <Card>
        <CardItem onClick={handleCardClick}>
          <Image src={image} alt={product.title} />
          <TitleGroup>
            <h3>{product.title}</h3>
            <h3>
              {product.form} {product.color}
            </h3>
          </TitleGroup>
        </CardItem>

        <ActionBlock>
          <FavoriteButton product={product} />

          <Price>{product.price} ₽</Price>
          <Icon
            icon={AddShoppingCartIcon}
            size="25px"
            color="var(--item-color)"
          />
        </ActionBlock>
      </Card>
    </ProductCardContainer>
  );
};
