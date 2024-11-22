import styled from "styled-components";

export const SearchContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  position: relative;
  width: 100%;
  height: 40px;
  margin: 40px  0;


  & > input {
    padding: 10px 32px 10px 10px;
  }

  & > div {
    position: absolute;
    top: 3px;
    right: 9px;
  }
`;