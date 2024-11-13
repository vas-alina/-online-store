import { useEffect, useState } from 'react';

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('fetchProducts')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div>
      <h2>Все товары</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <h3>{product.title}</h3>
            <p>Категория: {product.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllProducts;