import { Link, useNavigate } from "react-router-dom";
import { AdminItem, AdminItemsSection, AdminPageContainer } from "./style";

export const AdminPage = () => {
  const navigate = useNavigate();
  return (
    <AdminPageContainer>
      <AdminItemsSection>
        <AdminItem>
          <Link to="/catalog">Каталог</Link>
        </AdminItem>
        <AdminItem onClick={() => navigate("/catalog")}>Все товары</AdminItem>
        <AdminItem onClick={() => navigate("/users")}>
          Все пользователи
        </AdminItem>
        <AdminItem onClick={() => navigate("/orders")}>Все заказы</AdminItem>
      </AdminItemsSection>
    </AdminPageContainer>
  );
};
