export const deleteProductFromFavorites = async (favoriteId) => {
    const response = await fetch(`http://localhost:3010/carts/${favoriteId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    })
  
    if (!response.ok) {
      throw new Error('Ошибка при удалении товара из избранного на сервере');
    }
  }