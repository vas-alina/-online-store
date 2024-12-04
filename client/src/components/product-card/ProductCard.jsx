import { useNavigate } from "react-router-dom";
import { Icon } from "..";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {
  ActionBlock,
  Card,
  CardItem,
  Image,
  Price,
  ProductCardContainer,
  TitleGroup,
} from "./style";
import { useDispatch, useSelector } from "react-redux";
import { selectUserRole } from "../../selectors";

import { FavoriteButton } from "../favorite-button/Favorite-button";
export const ProductCard = ({ product }) => {
  // const { id, title, img_url, favorite_count, createdAt } = product;
  const navigate = useNavigate();
  const userRole = useSelector(selectUserRole);

  const dispatch = useDispatch();

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };



  return (
    <ProductCardContainer>
      <Card>
        <CardItem onClick={handleCardClick}>
          <Image src={product.imgUrl} alt={product.title} />
          <TitleGroup>
            <h3>{product.title}</h3>
            <h3>
              {product.form}   {product.color}
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
            hoverColor="darkorange"
            border="1px solid var(--item-color)"
            borderRadius="2px"
          />
        </ActionBlock>
      </Card>
    </ProductCardContainer>
  );
};
