import { useMemo, useEffect, useState } from "react";

import ProductCardAdmin from "./components/ProductCardAdmin";
import { ActionGroup, AdminCatalogContainer, AllProductGroup } from "./style";

import { checkAccess, debounce } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { selectUserRole } from "../../../selectors";
import { Button, Pagination, Search } from "../../../components";
import { PAGINATION_LIMIT, ROLE } from "../../../constans";
import { request } from "../../../utils/request";



import { Link, useNavigate, useParams } from "react-router-dom";
import {
  CLOSE_MODAL,
  openModal,
  removeProductAsync,
  RESET_PRODUCT_DATA,
} from "../../../action";
import { useMatch } from "react-router-dom";
export const AdminCatalogPage = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(2);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [shouldSearch, setShouldSearch] = useState(false);
  const [shouldUpdateProductList, setShouldUpdateProductList] = useState(false);
  const isEditing = useMatch("/catalog/:id/edit");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const userRole = useSelector(selectUserRole);

  useEffect(() => {
    if (!checkAccess([ROLE.ADMIN], userRole)) {
      return;
    }
    request(
      `/api/products?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`
    ).then(({ data: { products, lastPage } }) => {
      setProducts(products);
      setLastPage(lastPage);
    });
  }, [page, shouldSearch, userRole, params.id]);

  const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

  const onSearch = ({ target }) => {
    setSearchPhrase(target.value);
    startDelayedSearch(!shouldSearch);
  };
  const handleEdit = (id) => {
    navigate(`/products/${id}/edit`);
  };
  const handleAdd = () => {
    navigate(`/catalog/add`);
  };

  const onProductRemove = (id) => {
    dispatch(
      openModal({
        text: " Удалить продукт?",
        onConfirm: () => {
          dispatch(removeProductAsync(id)).then(() => {
            navigate("/catalog");
          });
          dispatch(CLOSE_MODAL);
        },
        onCancel: () => dispatch(CLOSE_MODAL),
      })
    );
  };

  return (
    <AdminCatalogContainer>
      <AllProductGroup>
        <ActionGroup>
          <Button onClick={handleAdd} width="150px">
            {" "}
            Добавить товар{" "}
          </Button>
          <Search onChange={onSearch} searchPhrase={searchPhrase} />
        </ActionGroup>

        {products.length > 0 ? (
          <div className="post-list">
            {products.map((product) => (
              <ProductCardAdmin
                key={product.id}
                product={product}
                onEdit={handleEdit}
                onDelete={onProductRemove}
              />
            ))}
          </div>
        ) : (
          <div className="no-posts-found">Ничего не нашлось</div>
        )}
        {lastPage > 1 && products.length > 0 && (
          <Pagination page={page} lastPage={lastPage} setPage={setPage} />
        )}
      </AllProductGroup>
    </AdminCatalogContainer>
  );
};
