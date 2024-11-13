import { useEffect, useState } from 'react';

const PavingSlabs = () => {
  const [pavingSlabs, setPavingSlabs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3010/products?category=pavingSlabs')
      .then(response => response.json())
      .then(data => setPavingSlabs(data))
      .catch(error => console.error('Error fetching paving slabs:', error));
  }, []);

  return (
    <div>
      <h2>Тротуарная плитка</h2>
      <ul>
        {pavingSlabs.map(product => (
          <li key={product.id}>
            <h3>{product.name}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PavingSlabs;