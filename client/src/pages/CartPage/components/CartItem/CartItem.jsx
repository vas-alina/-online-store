import { Icon } from "../../../../components";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  CartItemContainer,
  CurrentPrice,
  ItemDetails,
  ItemImage,
  ItemTitle,
  PriceSection,
  QuantityButton,
  QuantitySection,
  QuantityValue,
} from "./style";

export const CartItem = ({
  product,
  onUpdateQuantity,
  onRemove,
  onllRemove,
}) => {
  const { id, count, productDetails } = product;
  if (!productDetails) {
    return null;
  }
  return (
    <CartItemContainer>
      <ItemImage>
        <img src={productDetails.imgUrl} alt={productDetails.title} />
      </ItemImage>
      <ItemDetails>
        <ItemTitle>
          {productDetails.title} {productDetails.form} {productDetails.color}
        </ItemTitle>
      </ItemDetails>
      <PriceSection>
        <CurrentPrice>{productDetails.priceRegular} ₽</CurrentPrice>
      </PriceSection>
      <QuantitySection>
        <QuantityButton
          onClick={() => onUpdateQuantity(id, count - 1)}
          disabled={count <= 1}
        >
          -
        </QuantityButton>
        <QuantityValue>{count}</QuantityValue>
        <QuantityButton onClick={() => onUpdateQuantity(id, count + 1)}>
          +
        </QuantityButton>
        <Icon
          icon={DeleteIcon}
          width="10px"
          onClick={onRemove(id)}
        />
      </QuantitySection>
    </CartItemContainer>
  );
};
