export const deleteProductFromCart = async (cartId) => {
  const response = await fetch(`http://localhost:3010/carts/${cartId}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    throw new Error('Ошибка при удалении товара на сервере');
  }
}