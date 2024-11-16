import styled from "styled-components";
import { Container } from "../CartPage/style";
import { useNavigate } from "react-router-dom";
export const AdminItemsContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  width: 100%;
`;
const AdminItem = styled.div`
  padding: 15px 20px;
  margin: 10px 0;
  font-size: 18px;
  font-weight: 500;
  color: #fff;
  background-color: #816170;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #6e5360; 
    transform: translateY(-3px); 
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2); 
  }

  &:active {
    background-color: #9b848f; 
    transform: translateY(0);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
  }
`;
export const AdminPage = () => {
    const navigate = useNavigate()
  return (
    <Container>
      <AdminItemsContainer>
        <AdminItem onClick={() => navigate("/catalog")}>Все товары</AdminItem>
        <AdminItem onClick={() => navigate("/users")}>Все пользователи</AdminItem>
        <AdminItem onClick={() => navigate("/orders")}>Все заказы</AdminItem>
      </AdminItemsContainer>
    </Container>
  );
};
