import styled from "styled-components";

export const ActionBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 2px;
`;

export const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  width: 200px;
  margin: 10px;
  text-align: center;
  

  :hover {
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
`;

export const Price = styled.p`
  font-size: 14px;
  color: #555;
`;
export const ProductCardContainer = styled.div`
  display: flex;
`;
