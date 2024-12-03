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

import { Button, } from "../../components";
import { clearCartOnServer } from "../../bff/api/clear-cart-on-server";
import { removeFromCart } from "../../action/remove-from-cart";
import { deleteProductFromCart } from "../../bff/api";
import { clearCart, loadCartAsync, setCart, setUser } from "../../action";
import { removeAllFromCart } from "../../bff/operations/remove-all-from-cart";
import { request } from "../../utils/request";

export const CartPage = () => {
  const [carts, setCarts] = useState([]);
  const [products, setProducts] = useState([]);
 
  const [loading, setLoading] = useState(false);
  const userId = useSelector(selectUserId);
  const roleId = useSelector(selectUserRole);
const dispatch = useDispatch()
const [error, setError] = useState(null)
const [showAuthMessage, setShowAuthMessage] = useState(false);
const navigate = useNavigate();
useEffect(() => {
  const loadCarts = async () => {
    setLoading(true);
    try {
      const cartResponse = await request(`/api/carts/${userId}`, "GET");

      if (Array.isArray(cartResponse.cart)) {
        const productsWithDetails = await Promise.all(cartResponse.cart.map(async (cart) => {
          const productDetails = await request(`/api/products/${cart.product_id}`, "GET");
          return { ...cart, ...productDetails };
        }));
        setCarts(productsWithDetails);
        setProducts(productsWithDetails)
      } else {
        setError("Ответ с сервера не содержит данных в правильном формате.");
        console.error("Ответ с сервера:", cartResponse);
      }
    } catch (error) {
      setError("Ошибка загрузки избранного");
      console.error("Ошибка загрузки избранного:", error);
    } finally {
      setLoading(false);
    }
  };

  if (userId) {
    loadCarts();
  }
}, [userId]);



  const getTotalAmount = () => {
    return carts.reduce((total, item) => {
      return total + (item.count * item.price); 
    }, 0);
  };

  const handleUpdateQuantity = (id, newCount) => {
    setCart(prevCartProducts =>
      prevCartProducts.map(item =>
        item.id === id ? { ...item, count: newCount } : item
      )
    );
  };



    const handleRemoveProduct = async (cartId) => {
      try {
        await deleteProductFromCart(cartId);  
        dispatch(removeFromCart(cartId));     
        setCart((prevProducts) => prevProducts.filter(product => product.id !== cartId));
        console.log('Товар удален успешно');
      } catch (error) {
        console.error('Ошибка при удалении товара:', error.message);
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
      const totalAmount = getTotalAmount()
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
          {/* <ClearButton onClick={handleRemoveAll}>
            Очистить корзину
          </ClearButton> */}
        </CartTitle>
        {carts.length === 0 ? (
          <p>Ваша корзина пуста</p>
        ) : (
          carts.map((item) => {
      console.log(item)
            return (
              <> 
              <div>{item.data.title}</div>
              <CartItem
                key={item.data.id}
                product={item.data}
                // cart={cart}
                onUpdateQuantity={handleUpdateQuantity}
              onRemoveProduct={handleRemoveProduct}
              /></>
             
            );
          })
        )}
        
      </CartItemsContainer>
{carts.length >0 ? (<CartSummary>
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
      </CartSummary>) : (<></>)}
      
    </Container>
  );
};
