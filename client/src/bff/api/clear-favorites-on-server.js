export const clearFavoritesOnServer = async (userId) => {
  try {
    const response = await fetch(`http://localhost:3010/favorites?user_id=${userId}`);  
    if (!response.ok) {
      throw new Error('Ошибка при получении данных избранного');
    }
    const userFavorite = await response.json();


    for (const item of userFavorite) {
      await fetch(`http://localhost:3010/favorites/${item.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return { message: 'Избранное успешно очищено' };
  } catch (error) {
    console.error('Ошибка при очистке изранного на сервере:', error.message);
    throw error;
  }
};