import { useNavigate } from "react-router-dom";
import { Icon } from "..";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { ActionBlock, Card, Image, Price, ProductCardContainer } from "./style";

export const ProductCard = ({ ...product }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <ProductCardContainer>
      <Card onClick={handleCardClick}>
        <Image src={product.imgUrl} alt={product.title} />
        <h2>{product.title}</h2>
        <Price>{product.price} ₽</Price>
        <ActionBlock>
          <Icon
            icon={FavoriteBorderIcon}
            size="25px"
            color="var(--item-color)"
            hoverColor="darkorange"
          />
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
