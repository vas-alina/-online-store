// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import { useDispatch, useSelector } from "react-redux";
// import { selectCart } from "../../selectors";
// import { addProductToCart, removeFromCartAsync } from "../../action";

// export const CartButton = ({ product, size = 24 }) => {
//   const dispatch = useDispatch();
//   const cart = useSelector(selectCart);
//   console.log(cart);
//   const productId = product.id;

//   const isCart = cart.some((item) => item.id === productId);

//   const handleToogleToCart = () => {
//     const count = 1;
//     if (isCart) {
//       dispatch(removeFromCartAsync(productId));
//     } else {
//       dispatch(addProductToCart(productId, count));
//     }
//   };

//   return (
//     <div onClick={handleToogleToCart} style={{ cursor: "pointer" }}>
//       {isCart ? (
//         <ShoppingCartIcon style={{ color: "red", fontSize: `${size}px` }} />
//       ) : (
//         <ShoppingCartIcon style={{ color: "grey", fontSize: `${size}px` }} />
//       )}
//     </div>
//   );
// };
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { addProductToCart, removeFromCartAsync } from "../../action";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { selectCart } from "../../selectors";

export const CartButton = ({ product, size = 24 }) => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const productId = product.id;
  
  const productInCart = useMemo(
    () => cart.find((item) => item.id === productId),
    [cart, productId]
  );

  const handleToCart = () => {
    const count = 1;
    dispatch(addProductToCart(productId, count));
  };

  return (
    <div onClick={handleToCart} style={{ cursor: "pointer" }}>
      {productInCart ? (
        <CheckCircleIcon style={{ color: "red", fontSize: `${size}px` }} />
      ) : (
        <ShoppingCartIcon style={{ color: "grey", fontSize: `${size}px` }} />
      )}
    </div>
  );
};
