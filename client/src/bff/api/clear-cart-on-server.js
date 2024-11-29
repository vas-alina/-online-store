//TODO:после добавления бека исправить на код ниже. json не поддерживает удаление всех объектов

// export const clearCartOnServer = async (userId) => {
//     const response = await fetch(`http://localhost:3010/carts/user/userId=${userId}`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
  
//     if (!response.ok) {
//       throw new Error('Ошибка при очистке корзины на сервере');
//     }
//   };

export const clearCartOnServer = async (userId) => {
  try {
    const response = await fetch(`http://localhost:3010/carts?user_id=${userId}`);  
    if (!response.ok) {
      throw new Error('Ошибка при получении данных корзины');
    }
    const userCart = await response.json();


    for (const item of userCart) {
      await fetch(`http://localhost:3010/carts/${item.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return { message: 'Корзина успешно очищена' };
  } catch (error) {
    console.error('Ошибка при очистке корзины на сервере:', error.message);
    throw error;
  }
};