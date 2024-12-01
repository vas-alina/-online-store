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

import { PAGINATION_LIMIT } from "../../constans";
import { Pagination } from "./components/pagination/Pagination";
import { debounce } from "./utils";
import { request } from "../../utils/request";

export const CatalogPage = () => {
  const [activeSection, setActiveSection] = useState("allProducts");
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(2);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [shouldSearch, setShouldSearch] = useState(false);

  const fetchProducts = (category = "") => {
    const categoryQuery = category ? `&category=${category}` : "";
    request(
      `/api/products?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}${categoryQuery}`
    ).then(({ data: { products, lastPage } }) => {
      setProducts(products);
      setLastPage(lastPage);
    });
  };
  useEffect(() => {
    fetchProducts(activeSection === "allProducts" ? "" : activeSection);
  }, [page, shouldSearch, activeSection]);

  // useEffect(() => {
  //   request(
  //     `/api/products?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`
  //   ).then(({ data: { products, lastPage } }) => {
  //     setProducts(products);
  //     setLastPage(lastPage);
  //   });
  // }, [page, shouldSearch]);

  const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

  const onSearch = ({ target }) => {
    setSearchPhrase(target.value);
    startDelayedSearch(!shouldSearch);
  };

  const renderContent = () => {
    // switch (activeSection) {
    //   case "pavingSlabs":
    //     return <ProductList category="pavingSlabs" title="Тротуарная плитка" />;
    //   case "borders":
    //     return <ProductList category="borders" title="Бордюры" />;
    //   case "lawnGrate":
    //     return <ProductList category="lawnGrate" title="Газонная решетка" />;
    //   case "allProducts":
    //   default:
    //     return <ProductList title="Все товары" />;
    // }
    return (
      <ProductList
        category={activeSection === "allProducts" ? "" : activeSection}
        title={activeSection === "allProducts" ? "Все товары" : activeSection}
      />)
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
