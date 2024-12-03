import styled from "styled-components";

export const PaginationContainer = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: center;
  bottom: 140px;
  width: 50%;
  margin: 0 0 20px;
  padding: 0 35px;

  & button {
    margin: 0 5px;
  }

  & .current-page {
    width: 100%;
    height: 32px;
    margin: 0 5px;
    font-size: 18px;
    font-weight: 500;
    line-height: 26px;
    text-align: center;
    border: 1px solid #000;
  }
`;
