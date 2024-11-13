import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../../action/remove-from-cart';
import { removeAllFromCart } from '../../action/remove-all-from-cart';

const CartTest = () => {
  const items = useSelector(state => state.items);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClear = () => {
    dispatch(removeAllFromCart());
  };

  return (
    <div>
      <h2>Корзина</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price}
            <button onClick={() => handleRemove(item.id)}>Удалить</button>
          </li>
        ))}
      </ul>
      <button onClick={handleClear}>Очистить корзину</button>
    </div>
  );
};

export default CartTest;