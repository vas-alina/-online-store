import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROLE } from "../../constans";
import { Link } from "react-router-dom";
import { selectCart, selectUserId, selectUserRole } from "../../selectors";
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

import { Button } from "../../components";

import { removeFromCart } from "../../action/remove-from-cart";
import { deleteProductFromCart } from "../../bff/api";
import { clearCart, clearCartonServer, loadCartAsync, setCart, setUser } from "../../action";

export const CartPage = () => {
  //   const [carts, setCarts] = useState([]);
  //   const [products, setProducts] = useState([]);

  //   const [loading, setLoading] = useState(false);

  const roleId = useSelector(selectUserRole);

  const [error, setError] = useState(null);
  const [showAuthMessage, setShowAuthMessage] = useState(false);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();

  const carts = useSelector((state) => state.cart?.cart || []);
  console.log("carts из Redux:", carts);

  useEffect(() => {
    dispatch(loadCartAsync(userId)).catch((error) => {
      console.error("Ошибка при загрузке данных из корзины", error);
    });
  }, [dispatch]);

  console.log(userId);
  const handleRemoveAll = () => {
    try {
      dispatch(clearCartonServer(userId));
      sessionStorage.removeItem("cartData");
      console.error(`Избранное пользователя ${userId} успешно очищено.`);
    } catch (error) {
      console.error("Ошибка при очистке корзины:", error.message);
    }
  };
  if (loading) return <div>Загрузка избранного...</div>;

  const getTotalAmount = () => {
    return carts.reduce((total, item) => {
      return total + item.count * item.product.price;
    }, 0);
  };

  // const handleUpdateQuantity = (id, newCount) => {
  //   setCart(prevCartProducts =>
  //     prevCartProducts.map(item =>
  //       item.id === id ? { ...item, count: newCount } : item
  //     )
  //   );
  // };
  const handleUpdateQuantity = (id, newCount) => {
    console.log(`Обновление товара с id: ${id}, новое количество: ${newCount}`);
    setCart((prevCartProducts) => {
      console.log("Предыдущее состояние корзины:", prevCartProducts);
      return prevCartProducts.map((item) =>
        item.id === id ? { ...item, count: newCount } : item
      );
    });
  };

  const handleRemoveProduct = async (cartId) => {
    try {
      await deleteProductFromCart(cartId);
      dispatch(removeFromCart(cartId));
      setCart((prevProducts) =>
        prevProducts.filter((product) => product.id !== cartId)
      );
      console.log("Товар удален успешно");
    } catch (error) {
      console.error("Ошибка при удалении товара:", error.message);
    }
  };

  // const handleRemoveAll = async () => {
  //   const result = await dispatch(removeAllFromCart(userId));

  //   if (result.res) {
  //     setCartProducts([]);
  //     console.log("Корзина успешно очищена");
  //   } else {
  //     console.error("Ошибка при очистке корзины:", result.error);
  //   }
  // };
  const handleCheckout = () => {
    const totalAmount = getTotalAmount();
    if (roleId === ROLE.GUEST) {
      setShowAuthMessage(true);
    } else if (roleId === ROLE.USER) {
      navigate("/order", { state: { totalAmount } });
    }
  };
  if (loading) return <div>Загрузка корзины...</div>;

  return (
    <Container>
      <CartItemsContainer>
        <CartTitle>
          <h2>Корзина</h2>
          <ClearButton onClick={handleRemoveAll}>Очистить корзину</ClearButton>
        </CartTitle>
        {carts.length === 0 ? (
          <p>Ваша корзина пуста</p>
        ) : (
          carts.map((cart) => {
            const { product } = cart;
            return (
              <CartItem
                key={product.id}
                count={cart.count}
                product={product}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveProduct={handleRemoveProduct}
              />
            );
          })
        )}
      </CartItemsContainer>
      {carts.length > 0 ? (
        <CartSummary>
          <h2>Сумма заказа</h2>
          <h3>{getTotalAmount()}</h3>

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
      ) : (
        <></>
      )}
    </Container>
  );
};
