export const deleteProductFromCart = async (productId) =>
    fetch(`http://localhost:3010/cart/${productId}`, {
      method: "DELETE",
    });
  