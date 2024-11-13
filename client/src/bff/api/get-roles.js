export const getRoles = () =>
  fetch("http://localhost:3010/roles").then((loadedRoles) =>
    loadedRoles.json()
  );
