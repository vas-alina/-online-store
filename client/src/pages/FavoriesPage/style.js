import styled from "styled-components";

export const FavoritesPageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  top: 100px;
  max-width: 80%;
  justify-content: space-between;
  margin: 100px 135px;
  padding: 20px;
`;

export const FavoritesTitle = styled.h2`
display: flex;
justify-content: space-between;
  font-size: 24px;
  margin-bottom: 20px;
  margin-left: 130px;
`;

export const FavoritesItemsContainer = styled.div`
flex: 1;
margin-right: 20px;
max-width: 80%;
`;
export const ClearButton = styled.button`
border: none;
background-color: #fff;
color: gray;
font-weight: bold;

&:hover{
  cursor: pointer;
}
`

export const ErrorDiv = styled.div`
  font-size: 18px;
  color: #999;
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

export const ProductCartBlock = styled.div`
display: flex;
margin: 0 130px;
`