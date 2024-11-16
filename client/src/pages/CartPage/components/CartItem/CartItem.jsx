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
  const { id, count } = product;

  return (
    <CartItemContainer>
      <ItemImage>
        <img src={product.img_url} alt={product.title} />
      </ItemImage>
      <ItemDetails>
        <ItemTitle>
          {product.title} {product.form} {product.color}
        </ItemTitle>
      </ItemDetails>
      <PriceSection>
        <CurrentPrice>{product.price} ₽</CurrentPrice>
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
        <Icon icon={DeleteIcon} width="10px" onClick={onRemove(id)} />
      </QuantitySection>
    </CartItemContainer>
  );
};
