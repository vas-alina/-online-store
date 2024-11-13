import { transformUser } from "../transformers";
export const getUser = async (loginToFind) =>
  fetch(`http://localhost:3010/users?login=${loginToFind}`)
    .then((loadedUser) => loadedUser.json())
    .then(([loadedUser]) => loadedUser && transformUser(loadedUser));
