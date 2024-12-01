import { useMemo, useEffect, useState } from "react";
import { PAGINATION_LIMIT, ROLE } from "../../../constans";
import { debounce } from "../../CatalogPage/utils";
import { request } from "../../../utils/request";
import { Search } from "../../CatalogPage/components/search/Search";
import { Pagination } from "../../CatalogPage/components/pagination/Pagination";
import ProductCardAdmin from "./components/ProductCardAdmin";
import {
  AddProductGroup,
  AdminCatalogContainer,
  AllProductGroup,
  InputContainer,
} from "./style";

import { checkAccess } from "../../../utils";
import { useSelector } from "react-redux";
import { selectUserRole } from "../../../selectors";
import { Button, Input } from "../../../components";
//TODO: добавить модалку и лоадер
export const AdminCatalogPage = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(2);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [shouldSearch, setShouldSearch] = useState(false);
  const [newProductData, setNewProductData] = useState({
    id: "",
    img_url: "",
    title: "",
    price: "",
    color: "",
    form: "",
    width: "",
    height: "",
    length: "",
    desc: "",
  });
  const [shouldUpdateProductList, setShouldUpdateProductList] = useState(false);

  const [error, setError] = useState(null);
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
  }, [page, shouldSearch, userRole]);

  const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

  const onSearch = ({ target }) => {
    setSearchPhrase(target.value);
    startDelayedSearch(!shouldSearch);
  };
  const handleEdit = (product) => {
    console.log("Редактировать продукт:", product);
  };

  const handleDelete = (id) => {
    request(`/api/products/${id}`, "DELETE")
      .then((response) => {
        console.log(response.message);
        setShouldUpdateProductList(!shouldUpdateProductList);
      })
      .catch((error) => {
        console.error("Ошибка при удалении продукта:", error);
        alert(`Ошибка: ${error.message}`);
      });
  };

  const handleNewOrderChange = (field, value) => {
    setNewProductData((prev) => ({ ...prev, [field]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await request("/api/products", "POST", {
        product: newProductData,
      });
      if (response.error) {
        setError(response.error);
      } else {
        console.log("Товар успешно добавлен:", response.product);
        setNewProductData([]);
      }
    } catch (error) {
      console.error(error);
      setError("Ошибка при добавлении товара");
    }
  };

  return (
    <AdminCatalogContainer>
      <AddProductGroup>
        <h3>Добавление нового продукта</h3>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <InputContainer>
          <Input
            width="95%"
            placeholder="Название"
            value={newProductData.title}
            onChange={(e) => handleNewOrderChange("title", e.target.value)}
          />
          <Input
            width="95%"
            placeholder="Картинка"
            value={newProductData.img_url}
            onChange={(e) => handleNewOrderChange("img_url", e.target.value)}
          />
          <Input
            width="95%"
            placeholder="Цена"
            value={newProductData.price}
            onChange={(e) => handleNewOrderChange("price", e.target.value)}
          />
          <Input
            width="95%"
            placeholder="Форма"
            value={newProductData.form}
            onChange={(e) => handleNewOrderChange("form", e.target.value)}
          />
          <Input
            width="95%"
            placeholder="Цвет"
            value={newProductData.color}
            onChange={(e) => handleNewOrderChange("color", e.target.value)}
          />
          <Input
            width="95%"
            placeholder="Ширина"
            value={newProductData.width}
            onChange={(e) => handleNewOrderChange("width", e.target.value)}
          />
          <Input
            width="95%"
            placeholder="Высота"
            value={newProductData.height}
            onChange={(e) => handleNewOrderChange("height", e.target.value)}
          />
          <Input
            width="95%"
            placeholder="Длина"
            value={newProductData.length}
            onChange={(e) => handleNewOrderChange("length", e.target.value)}
          />
          <Input
            width="95%"
            placeholder="Описание"
            value={newProductData.desc}
            onChange={(e) => handleNewOrderChange("desc", e.target.value)}
          />
        </InputContainer>
        <Button onClick={handleSubmit}> Добавить в базу</Button>
      </AddProductGroup>
      <AllProductGroup>
        <Search onChange={onSearch} searchPhrase={searchPhrase} />
        {products.length > 0 ? (
          <div className="post-list">
            {products.map((product) => (
              <ProductCardAdmin
                key={product.id}
                product={product}
                onEdit={handleEdit}
                onDelete={handleDelete}
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
