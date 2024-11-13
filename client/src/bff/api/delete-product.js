export const deleteProduct = async (productId) =>
  fetch(`http://localhost:3010/products/${productId}`, {
    method: "DELETE",
  });
