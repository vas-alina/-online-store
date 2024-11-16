import { useMemo, useEffect, useState } from "react";
import { useServerRequest } from "../../hooks";
import { Pagination, ProductCard, Search } from "./components";
import { PAGINATION_LIMIT } from "../../constans";
import { debounce, getLastPageFromLinks } from "./utils";
import styled from "styled-components";

const MainContainer = ({ className }) => {
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

  return (
    <div className={className}>
      <div className="products-and-search">
        <Search onChange={onSearch} searchPhrase={searchPhrase} />
        {products.length > 0 ? (
          <div className="product-list">
            {products.map(
              ({ id, title, imgUrl, publishedAt, commentsCount }) => (
                <ProductCard
                  key={id}
                  id={id}
                  imgUrl={imgUrl}
                  title={title}
                  publishedAt={publishedAt}
                  commentsCount={commentsCount}
                />
              )
            )}
          </div>
        ) : (
          <div className="no-products-found">Ничего не нашлось</div>
        )}
      </div>

      {lastPage > 1 && products.length > 0 && (
        <Pagination page={page} lastPage={lastPage} setPage={setPage} />
      )}
    </div>
  );
};

export const Main = styled(MainContainer)`
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  & .product-list {
    display: flex;
    flex-wrap: wrap;
    padding: 20px 20px 80px;
  }

  & .no-products-found {
    font-size: 18px;
    margin-top: 40px;
    text-align: center;
  }
`;
