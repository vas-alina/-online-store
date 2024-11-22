import { useEffect, useMemo, useState } from "react";
import { ProductList } from "./components/product-list/ProductList";
import { Search } from "./components/search/Search";
import {
  CatalogPageContainer,
  Content,
  ItemBlock,
  MenuItem,
  Sidebar,
} from "./style";
import { useServerRequest } from "../../hooks";
import { PAGINATION_LIMIT } from "../../constans";
// import { debounce, getLastPageFromLinks } from "../main/utils";
import { Pagination } from "./components/pagination/Pagination";
import { debounce, getLastPageFromLinks } from "./utils";

export const CatalogPage = () => {
  const [activeSection, setActiveSection] = useState("allProducts");
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(2);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [shouldSearch, setShouldSearch] = useState(false);
  const requestServer = useServerRequest();

  useEffect(() => {
    requestServer("fetchProducts", searchPhrase, page, PAGINATION_LIMIT).then(
      ({ res: { products, links } }) => {
        setProducts(products);
        setLastPage(getLastPageFromLinks(links));
      }
    );
  }, [requestServer, page, shouldSearch]);

  const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

  const onSearch = ({ target }) => {
    setSearchPhrase(target.value);
    startDelayedSearch(!shouldSearch);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "pavingSlabs":
        return <ProductList category="pavingSlabs" title="Тротуарная плитка" />;
      case "borders":
        return <ProductList category="borders" title="Бордюры" />;
      case "lawnGrate":
        return <ProductList category="lawnGrate" title="Газонная решетка" />;
      case "allProducts":
      default:
        return <ProductList title="Все товары" />;
    }
  };

  return (
    <CatalogPageContainer>
      <Sidebar>
        <MenuItem
          active={activeSection === "allProducts"}
          onClick={() => setActiveSection("allProducts")}
        >
          Все товары
        </MenuItem>
        <MenuItem
          active={activeSection === "pavingSlabs"}
          onClick={() => setActiveSection("pavingSlabs")}
        >
          Тротуарная плитка
        </MenuItem>
        <MenuItem
          active={activeSection === "borders"}
          onClick={() => setActiveSection("borders")}
        >
          Бордюры
        </MenuItem>
        <MenuItem
          active={activeSection === "lawnGrate"}
          onClick={() => setActiveSection("lawnGrate")}
        >
          Газонная решетка
        </MenuItem>
      </Sidebar>
      <Content>
        <Search onChange={onSearch} searchPhrase={searchPhrase} />
        <ItemBlock>{renderContent()}</ItemBlock>

        {lastPage > 1 && products.length > 0 && (
          <Pagination page={page} lastPage={lastPage} setPage={setPage} />
        )}
      </Content>
    </CatalogPageContainer>
  );
};
