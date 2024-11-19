import styled from "styled-components";
export const OrdersContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  align-items: center;
  width: 700px;
  font-size: 18px;
  .order-id-column, .customer-column, .order-date-column, .status-column, .total-column {
    font-weight: bold;
  }
`;