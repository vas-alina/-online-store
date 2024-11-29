import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLayoutEffect } from "react";
import { setCart, setUser, setFavorites } from "./action";
import {
  Authorization,
  CartPage,
  HomePage,
  Orders,
  Registration,
  PersonalPage,
  ProductCardPage,
  Users,
  FavoritesPage,
} from "./pages";
import { OrderPage } from "./pages/CartPage/components/OrderPage/OrderPage";
import Header from "./components/Header/Header";

import { Footer } from "./components/footer/Footer";
import { CatalogPage } from "../src/pages/CatalogPage/CatalogPage";

// import { ERROR } from "./constans";

import { Modal } from "./components";

import GlobalStyle from "./GlobalStyles";
import { AppContainer, Page } from "./style";

export const App = () => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const currentUserDataJSON = sessionStorage.getItem("userData");
    const currentCartDataJSON = sessionStorage.getItem("cartData");
    const currentFavoritesDataJSON = sessionStorage.getItem("favoritesData");

    if (!currentUserDataJSON) {
      return;
    }
    const currentUserData = JSON.parse(currentUserDataJSON);
    dispatch(
      setUser({
        ...currentUserData,
        roleId: Number(currentUserData.roleId),
      })
    );
    if (currentUserData.roleId === 0) {
      return;
    }

    if (!currentCartDataJSON) {
      return;
    }
    const currentCartData = JSON.parse(currentCartDataJSON);
    dispatch(setCart(currentCartData));

    if (!currentFavoritesDataJSON) {
      return;
    }
    const currentFavoritesData = JSON.parse(currentCartDataJSON);
    dispatch(setFavorites(currentFavoritesData));
  }, [dispatch]);

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Header />
        <Page>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Authorization />} />
            <Route path="/products" element={<CatalogPage />} />
            <Route path="/products/:id" element={<ProductCardPage />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/users" element={<Users />} />
            <Route path="/personal" element={<PersonalPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </Page>
        <Footer />
        <Modal />
      </AppContainer>
    </>
  );
};
