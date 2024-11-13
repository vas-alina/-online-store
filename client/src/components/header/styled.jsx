import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  color: black;
  box-sizing: border-box;
  width: 100%;
  background-color: #f8f8f8;
  z-index: 1;



`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 50px 0 50px;
  background-color: #ffffff;
  font-size: 14px;
`;

export const TopNavLinks = styled.div`
  a {
    margin-right: 20px;
    text-decoration: none;
    color: #333;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const CenterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 50px 0 50px;
  background-color: var(--main-bg-color);
`;

export const LogoImg = styled.img`
  width: 70px;
  height: 70px;
`;

export const CatalogBox = styled.div`
  flex: 0 0 10%;
  text-align: center;
`;

export const SearchBox = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  flex: 0 0 50%;

  input {
    width: 100%;
    padding: 8px 2px 8px 35px;
    margin-left: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1em;
  }
`;

export const IconsBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px 0;
  flex: 0 0 5%;
`;

export const BottomNav = styled.div`
  display: flex;
  justify-content: center;
  height: 15px;
  background-color: var(--footer-input-bg-color);
  padding: 10px 0;
  color: var(--item-color);
`;

export const MenuLink = styled.a`
  margin: 0 15px;
  color: var(--item-color);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const Text = styled.span`
  margin-top: 3px;
  font-size: 12px;
`;
export const Burger = styled.div`
    width: 20px;
    height: 20px;
    padding: 4px 0;

    div {
        position: relative;
        display: block;
        width: 18px;
        height: 2px;
        margin: 0 1px;
        background-color: #fff;

    }

    div:not(:first-child) {
        margin-top: 3px;
    }
`