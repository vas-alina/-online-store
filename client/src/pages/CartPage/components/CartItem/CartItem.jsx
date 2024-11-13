import { CartItemContainer, CurrentPrice, ItemDetails, ItemImage, ItemTitle, PriceSection, QuantityButton, QuantitySection, QuantityValue } from "./style";

export const CartItem = ({ product, onUpdateQuantity }) => {
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
          <ItemTitle>{productDetails.title}</ItemTitle>
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
        </QuantitySection>
      </CartItemContainer>
    );
  };