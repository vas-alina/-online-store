import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import { HomePage } from "./pages/HomePage/HomePage";
import { Authorization } from "./pages/authorization/Authorization";
import { Footer } from "./components/footer/Footer";
import GlobalStyle from "./GlobalStyles";
import { useDispatch } from "react-redux";
import { setUser } from "./action";
import styled from "styled-components";
import { CatalogPage } from "../src/pages/CatalogPage/CatalogPage";
// import { CartPage } from "../src/pages/CartPage/CartPage";
// import { Product } from "./pages/ProductPage/ProductPage";
// import { ERROR } from "./constans";
import { useLayoutEffect } from "react";
import { Registration } from "./pages/registration/Registration";
import { Users } from "./pages/users/Users";
import { Modal } from "./components";
import { PersonalPage } from "./pages/PersonalPage/PersonalPage";
import { ProductDetailPage } from "./pages/ProductPage/Product";
import { Cart } from "./pages/CartPage/CartPage";
import { OrderPage } from "./pages/CartPage/components/OrderPage/OrderPage";
import PavingSlabs from "./pages/CatalogPage/components/paving-slabs/PavingSlabs";

const AppColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh; 
  justify-content: space-between;
  position: relative;
  margin: 0 auto; 
  background-color: #ffff;
`;
const Page = styled.div`
  margin-top: 150px;
  padding-left: 5%;
  padding-right: 5%;
`;

export const App = () => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const currentUserDataJSON = sessionStorage.getItem("userData");

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
  }, [dispatch]);
  return (
    <>
      <GlobalStyle />
      <AppColumn>
        <Header />
        <Page>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Authorization />} />
            <Route path="/products" element={<CatalogPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/users" element={<Users />} />
            <Route path="/personal" element={<PersonalPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/paving-slabs" element={<PavingSlabs />} />
          </Routes>
        </Page>
        <Footer />
        <Modal />
      </AppColumn>
    </>
  );
};
