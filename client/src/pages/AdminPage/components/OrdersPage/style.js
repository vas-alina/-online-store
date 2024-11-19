import styled from "styled-components";

export const Table = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 2fr 2fr;
  gap: 12px;
  margin-top: 20px;
`;

export const TableRow = styled.div`
  display: contents;

  & > div {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: center;
  }
`;

export const HeaderRow = styled(TableRow)`
  font-weight: bold;
  background-color: #f5f5f5;

  & > div {
    border-color: #bbb;
  }
`;

export const OrderPageTitle = styled.h2`
  text-align: center;
  margin: 20px 0;
`;