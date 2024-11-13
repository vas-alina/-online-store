import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ProductCard } from '../product-card/ProductCard';
import { transformProduct } from './../../../../bff/transformers/transform-product';

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

export const ProductList = ({ category, title }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Формируем URL для запроса в зависимости от категории
    const url = category 
      ? `http://localhost:3010/products?category=${category}` 
      : `http://localhost:3010/products`;

      fetch(url)
      .then(response => response.json())
      .then(data => {

        const transformedProducts = data.map(transformProduct);
        setProducts(transformedProducts);
      })
      .catch(error => console.error(`Ошибка при получении данных для ${category || 'all'}:`, error));
  }, [category]);

  return (
    <div>
      <h2>{title}</h2>
      <Grid>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>
    </div>
  );
};

