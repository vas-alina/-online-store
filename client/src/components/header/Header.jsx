import LOGO from "../../assets/main-logo.png";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "../button/Button";
import {
  HeaderContainer,
  TopBar,
  TopNavLinks,
  CenterSection,
  LogoImg,
  CatalogBox,
  SearchBox,
  
  BottomNav,
  MenuLink,

  Burger,
} from "./styled.jsx";
import { ControlPanel } from "./components/control-panel/Control-panel.jsx";


const Header = () => (
  <HeaderContainer>
    <TopBar>
      <TopNavLinks>
        <a href="#about">О компании</a>
        <a href="#payment">Оплата и доставка</a>
        <a href="#stores">Офисы продаж</a>
        <a href="#contacts">Контакты</a>
      </TopNavLinks>
      <a href="#profile">8 (861) 219-97-64</a>
    </TopBar>
    <CenterSection>
      <Link to="/">
        <LogoImg src={LOGO} alt="home" />
      </Link>
      <CatalogBox>
        <Button>
          <Burger>
            <div />
            <div />
            <div />
          </Burger>
          <span>Каталог</span>
          </Button>
      </CatalogBox>
      <SearchBox>
        <input type="text" placeholder="Поиск по сайту..." />
        <SearchIcon
          style={{ position: "absolute", left: "10px", color: "#aaa" }}
        />
        <Button width="200px">Найти</Button>
      </SearchBox>
      <ControlPanel />
    </CenterSection>
    <BottomNav>
      <MenuLink href="#sales">Акции</MenuLink>
      <MenuLink href="#mixers">Новинки</MenuLink>
      <MenuLink>
        {/* <Link to="/paving-slabs">Тротуарная плитка
        </Link> */}
        </MenuLink>
      <MenuLink href="#stands">Бордюры</MenuLink>
      <MenuLink href="#bath">Газонная решетка</MenuLink>
    </BottomNav>
  </HeaderContainer>
);

export default Header;
