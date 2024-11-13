import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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
  OldTotalPrice,
  TotalPrice,
} from "./style";

export const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const roleId = useSelector(selectUserRole);

  const navigate = useNavigate();
  const [showAuthMessage, setShowAuthMessage] = useState(false);

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
            const foundProduct = productsData.find(
              (product) => String(product.id) === String(cartProduct.productId)
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

  const calculateTotal = () => {
    let oldTotal = 0;
    let newTotal = 0;
    cartProducts.forEach((product) => {
      oldTotal += product.price_regular * product.count;
      newTotal += product.price_regular * product.count;
    });
    return { oldTotal, newTotal };
  };

  const handleCheckout = () => {
    if (roleId === ROLE.GUEST) {
      setShowAuthMessage(true);
    } else if (roleId === ROLE.USER) {
      navigate("/order");
    }
  };

  const { oldTotal, newTotal } = calculateTotal();

  if (loading) return <div>Загрузка корзины...</div>;

  return (
    <CartContainer>
      <CartTitle>Корзина</CartTitle>
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
      />
    );
  })
)}
      </CartItemsContainer>

      <CartSummary>
        {oldTotal !== newTotal && (
          <OldTotalPrice>Старая цена: {oldTotal} ₽</OldTotalPrice>
        )}
        <TotalPrice>Итоговая цена: {newTotal} ₽</TotalPrice>

        <CheckoutButton onClick={handleCheckout}>
        Оформить заказ!</CheckoutButton>
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
