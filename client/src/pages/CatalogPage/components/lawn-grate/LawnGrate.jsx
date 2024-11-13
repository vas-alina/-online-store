import { useEffect, useState } from 'react';

export const LawnGrate = () => {
  const [lawnGrate, setLawnGrate] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3010/products?category=lawnGrate')
      .then(response => response.json())
      .then(data => setLawnGrate(data))
      .catch(error => console.error('Error fetching lawn grate:', error));
  }, []);

  return (
    <div>
      <h2>Газонная решетка</h2>
      <ul>
        {lawnGrate.map(product => (
          <li key={product.id}>
            <h3>{product.name}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
};
