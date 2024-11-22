import { useEffect, useState } from "react";
import { ProductCard } from "../../../../components/product-card/ProductCard";
import { transformProduct } from "./../../../../bff/transformers/transform-product";
import { ProductsItem, ProductsListContainer } from "./style";

export const ProductList = ({ category, title }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const url = category
      ? `http://localhost:3010/products?category=${category}`
      : `http://localhost:3010/products`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const transformedProducts = data.map(transformProduct);
        setProducts(transformedProducts);
      })
      .catch((error) =>
        console.error(
          `Ошибка при получении данных для ${category || "all"}:`,
          error
        )
      );
  }, [category]);

  return (
    <ProductsListContainer>
      <h2>{title}</h2>
      <ProductsItem>
        {products.map((product) => (
          <ProductCard {...product} key={product.id} />
        ))}
      </ProductsItem>
    </ProductsListContainer>
  );
};
