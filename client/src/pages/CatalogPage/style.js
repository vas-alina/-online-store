import styled from "styled-components";

export const CatalogPageContainer = styled.div`
  display: flex;
  margin: 100px 0;
`;
export const ItemBlock = styled.div`
  display: flex;
  margin: 100px 0;
`;

export const Sidebar = styled.div`
  width: 200px;
  background-color: #f2f2f2;
  padding: 20px;
`;

export const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

export const MenuItem = styled.div`
  margin: 10px 0;
  cursor: pointer;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  color: ${(props) => (props.active ? "blue" : "black")};
`;
