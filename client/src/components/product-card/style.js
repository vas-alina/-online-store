import styled from "styled-components";

export const ActionBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 2px;
`;




export const Card = styled.div`
display: flex;
flex-direction: column;
justify-content: center;       /* Центрирование по вертикали */
align-items: center;   
  border: 1px solid #ddd;
  border-radius: 8px;
  /* padding: 16px; */
  width: 250px;
  height: 300px;
  margin: 10px;
  text-align: center;


  :hover {
    cursor: pointer;
  }
`;

export const CardItem = styled.div`
display:flex;
flex-direction: column;
align-items: center;
 border: 1px solid red;
  border-radius: 8px;
  padding: 5px;
  width: 200px;
  height: 80%;
  margin: 1px;
  text-align: center;
:hover {
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }


`

export const Image = styled.img`
  width: 150px;
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
