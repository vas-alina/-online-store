import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROLE } from "../../constans";
import { Link } from "react-router-dom";
import { selectUserRole } from "../../selectors";
import { transformProduct } from "../../bff/transformers";

import { CartItem } from "./components/CartItem/CartItem";
import {
  CartContainer,
  CartItemsContainer,
  CartSummary,
  CartTitle,
  CheckoutButton,
  CheckoutNote,
  ErrorDiv,
} from "./style";
import { removeFromCart } from "../../action/remove-from-cart";
import { removeAllFromCart } from "../../action/remove-all-from-cart";
import { Button } from "../../components";

export const CartPage = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const roleId = useSelector(selectUserRole);
  const [total, setTotal] = useState(0)
  const navigate = useNavigate();
  const [showAuthMessage, setShowAuthMessage] = useState(false);
  const products = useSelector(state => state.items)
  const dispatch = useDispatch()

  const handleRemove = (id) => {
    dispatch(removeFromCart(id))
  }
  const handleAllRemove = () => {
    dispatch(removeAllFromCart())
  }
  useEffect(() => {
    setLoading(true);

    fetch("http://localhost:3010/cart")
      .then((cartResponse) => {
        if (!cartResponse.ok) {
          throw new Error("Ошибка загрузки данных корзины");
        }
        return cartResponse.json();
      })
      .then(async (cartData) => {
   
        const productsResponse = await fetch("http://localhost:3010/products");
        if (!productsResponse.ok) {
          throw new Error("Ошибка загрузки данных продуктов");
        }
        const productsData = await productsResponse.json();
        const cartWithProductDetails = cartData
          .map((cartProduct) => {

            const productId = typeof cartProduct.productId === 'string'
            ? {id: cartProduct.productId}
            : cartProduct.productId;

            const foundProduct = productsData.find(
              (product) => String(product.id) === String(productId.id)
            );
           
            const productDetails = foundProduct
              ? transformProduct(foundProduct)
              : null;
            return productDetails
              ? { ...cartProduct, productDetails }
              : null;
          })
          .filter(Boolean);
        setCartProducts(cartWithProductDetails);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке данных корзины:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleUpdateQuantity = (productId, newQuantity) => {
    setCartProducts((prevCartProducts) =>
      prevCartProducts.map((product) =>
        product.productId === productId
          ? { ...product, count: newQuantity }
          : product
      )
    );
  };

  const handleCheckout = () => {
    if (roleId === ROLE.GUEST) {
      setShowAuthMessage(true);
    } else if (roleId === ROLE.USER) {
      navigate("/order");
    }
  };


  if (loading) return <div>Загрузка корзины...</div>;

  return (
    <CartContainer>
      <CartTitle>Корзина</CartTitle>
      <button onClick={removeAllFromCart}>Очистить корзину</button>
      <CartItemsContainer>

{cartProducts.length === 0 ? (
  <p>Ваша корзина пуста</p>
) : (
  cartProducts.map((product) => {
    if (!product.productId) {
      console.error("Не найден productId у товара:", product);
      return null;
    }
    return (
      <CartItem
        key={product.productId}
        product={product}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemove}
        onAllRemove={handleAllRemove}
      />
    );
  })
)}
      </CartItemsContainer>

      <CartSummary>
      
<Button 
width="200px"
onClick={handleCheckout}
> Оформить заказ </Button>
        
        <CheckoutNote>
          Нажимая на кнопку «Оформить заказ», вы соглашаетесь с условиями
          <a href="/terms"> Обработки персональных данных</a>.
        </CheckoutNote>
        {showAuthMessage && (
          <ErrorDiv>
            Для продолжения оформления необходима{" "}
            <Link to="/login">авторизация</Link>
          </ErrorDiv>
        )}
      </CartSummary>
    </CartContainer>
  );
};
