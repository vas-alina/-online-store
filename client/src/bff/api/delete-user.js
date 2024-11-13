export const deleteUser = (userId) =>
  fetch(`http://localhost:3010/users/${userId}`, {
    method: "DELETE",
  });
