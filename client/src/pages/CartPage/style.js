import styled from "styled-components";

export const CartContainer = styled.div`

  max-width: 800px;
  margin: auto;
  padding: 20px;
`;

export const CartTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const CartItemsContainer = styled.div`
  border-top: 1px solid #eee;
`;


export const ErrorDiv = styled.div`
  font-size: 18px;
  color: #999;
`;



export const CartSummary = styled.div`
  text-align: right;
  padding-top: 20px;
`;

export const OldTotalPrice = styled.div`
  text-decoration: line-through;
  color: #999;
  font-size: 14px;
`;

export const TotalPrice = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

export const CheckoutButton = styled.button`
  margin-top: 10px;
  background-color: #ff5722;
  color: white;
  padding: 12px 24px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #e64a19;
  }
`;

export const CheckoutNote = styled.p`
  font-size: 12px;
  color: #777;
  margin-top: 10px;
`;