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
  TotalPrice
} from "./style";

export const CartItem = ({
  product,
  onUpdateQuantity,
  onRemove,
  onRemoveProduct,
  cart

}) => {
  const { id, count, price, img_url, title, form, color } = product;
  const image = product.img_url
  // const deleteId = cart.id
  const itemTotal = count * price;
  
  return (
    <CartItemContainer>
      <ItemImage>
        {image ? (<img src={product.img_url} alt={product.title} />) : (<div> Картинки нет</div>)}
        
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
        <button onClick={() => onRemoveProduct(id)}>Удалить</button>
        <PriceSection>
        <TotalPrice>Итог: {itemTotal} ₽</TotalPrice>
        </PriceSection>
      </QuantitySection>
    </CartItemContainer>
  );
};
