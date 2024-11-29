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
import { clearCart } from "../../action";
import { removeAllFromCart } from "../../bff/operations/remove-all-from-cart";

export const CartPage = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const roleId = useSelector(selectUserRole);
  const navigate = useNavigate();
  const [showAuthMessage, setShowAuthMessage] = useState(false);
  const userId = useSelector(selectUserId)
  const dispatch = useDispatch();
const cart = useSelector(selectCart)



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


  const getTotalAmount = () => {
    return cartProducts.reduce((total, item) => {
      return total + (item.count * item.price); 
    }, 0);
  };

  const handleUpdateQuantity = (id, newCount) => {
    setCartProducts(prevCartProducts =>
      prevCartProducts.map(item =>
        item.id === id ? { ...item, count: newCount } : item
      )
    );
  };

  const handleCheckout = () => {
    const totalAmount = getTotalAmount()
    if (roleId === ROLE.GUEST) {
      setShowAuthMessage(true);
    } else if (roleId === ROLE.USER) {
      navigate("/order", { state: { totalAmount } });
    }
  };

    const handleRemoveProduct = async (cartId) => {
      try {
        await deleteProductFromCart(cartId);  
        dispatch(removeFromCart(cartId));     
        setCartProducts((prevProducts) => prevProducts.filter(product => product.id !== cartId));
        console.log('Товар удален успешно');
      } catch (error) {
        console.error('Ошибка при удалении товара:', error.message);
      }
    };
    
    // const handleRemoveAll = async () => {
    //   try {
    //     if (userId) {
    //       await clearCartOnServer(userId); 
    //       dispatch(clearCart());            
    //       setCartProducts([]);              
    //     } else {
    //       console.error('userId отсутствует');
    //     }
    //   } catch (error) {
    //     console.error('Ошибка при очистке корзины:', error.message);
    //   }
    // };
    const handleRemoveAll = async () => {
      const result = await dispatch(removeAllFromCart(userId));
      
      if (result.res) {
        setCartProducts([]);
        console.log("Корзина успешно очищена");
      } else {
        console.error("Ошибка при очистке корзины:", result.error);
      }
    };
  if (loading) return <div>Загрузка корзины...</div>;
  
  return (
    <Container>
      <CartItemsContainer>
        <CartTitle>
          <h2>Корзина</h2>
          <ClearButton onClick={handleRemoveAll}>
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
                cart={cart}
                onUpdateQuantity={handleUpdateQuantity}
              onRemoveProduct={handleRemoveProduct}
              />
            );
          })
        )}
        
      </CartItemsContainer>
{cartProducts.length >0 ? (<CartSummary>
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
