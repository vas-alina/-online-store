import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROLE } from "../../constans";
import { Link } from "react-router-dom";
import { selectUserId, selectUserRole } from "../../selectors";
import { CartItem } from "./components/CartItem/CartItem";
import {
  Container,
  CartItemsContainer,
  CartSummary,
  CartTitle,
  ClearButton,
  CheckoutNote,
  ErrorDiv,
  
} from "./style";
// import { removeFromCart } from "../../action/remove-from-cart";
import { removeAllFromCart } from "../../action/remove-all-from-cart";
import { Button, } from "../../components";

export const CartPage = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const roleId = useSelector(selectUserRole);
  const navigate = useNavigate();
  const [showAuthMessage, setShowAuthMessage] = useState(false);
  const userId = useSelector(selectUserId)
  const dispatch = useDispatch();

  //TODO: нерабочая схема
  // const handleRemove = (id) => {
  //   dispatch(removeFromCart(id));
  // };
  const handleAllRemove = () => {
    dispatch(removeAllFromCart());
  };

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3010/carts")
      .then((cartResponse) => {
        if (!cartResponse.ok) {
          throw new Error("Ошибка загрузки данных корзины");
        }
        return cartResponse.json();
      })

      .then((cartData) => {
        const userCart = cartData.filter((item) => item.user_id === userId)
          console.log("Товары в корзине: ", userCart);
          setCartProducts(userCart)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Ошибка при загрузке данных корзины:", error);
        setLoading(false);
      })
  }, [userId]);

  const handleUpdateQuantity = (productId, newQuantity) => {
    setCartProducts((prevCartProducts) =>
      prevCartProducts.map((item) =>
        item.productId === productId
          ? { ...item, count: newQuantity }
          : item
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
    <Container>
      <CartItemsContainer>
        <CartTitle>
          <h2>Корзина</h2>
          <ClearButton onClick={removeAllFromCart}>
            Очистить корзину
          </ClearButton>
        </CartTitle>
        {cartProducts.length === 0 ? (
          <p>Ваша корзина пуста</p>
        ) : (
          cartProducts.map((item) => {
      
            return (
              <CartItem
                key={item.id}
                product={item}
                onUpdateQuantity={handleUpdateQuantity}

              />
            );
          })
        )}
      </CartItemsContainer>

      <CartSummary>
        <h2>Сумма заказа</h2> 
        <h3>{}</h3>
        <Button width="200px" onClick={handleCheckout}>
          
          Оформить заказ
        </Button>

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
    </Container>
  );
};
