import { useEffect, useState } from 'react';

const Borders = () => {
  const [borders, setBorders] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3010/products?category=borders')
      .then(response => response.json())
      .then(data => setBorders(data))
      .catch(error => console.error('Error fetching borders:', error));
  }, []);

  return (
    <div>
      <h2>Бордюры</h2>
      <ul>
        {borders.map(product => (
          <li key={product.id}>
            <h3>{product.title}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Borders;