import styled from "styled-components";

export const OrderRowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

export const OrderCell = styled.div`
  flex: 1;
  text-align: center;
`;

export const RemoveButton = styled.div`
  flex: 0;
  text-align: center;

  button {
    background-color: red;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: darkred;
    }
  }
`;